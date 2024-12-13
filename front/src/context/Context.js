import React, { useState, useEffect, useRef, createContext } from "react";
import { socket } from "../config/config";
import Peer from "simple-peer";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL

const VideoCallContext = createContext();

const VideoCallProvider = ({  children }) => {
 
  const [userStream, setUserStream] = useState(null);
  const [call, setCall] = useState({});
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [myUserId, setMyUserId] = useState("");
  const [partnerUserId, setPartnerUserId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [name, setName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [isMyVideoActive, setIsMyVideoActive] = useState(true);
  const [isPartnerVideoActive, setIsPartnerVideoActive] = useState();
  const [isMyMicActive, setIsMyMicActive] = useState(true);
  const [isPartnerMicActive, setIsPartnerMicActive] = useState();
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const myVideoRef = useRef();
  const partnerVideoRef = useRef();
  const peerConnectionRef = useRef();
  const screenShareTrackRef = useRef();

useEffect(() => {
 
  const getUserMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setUserStream(stream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }; 

  const handleSocketEvents = () => {
    // Function to handle when socketId is received
    const onSocketIdReceived = (id) => {
     console.log(id)
      
      let url = document.location.href;
      
      let username = localStorage.getItem("username")// Get the second-to-last part of the URL
      console.log(username);
      // Call your custom function here, passing the id and username
      customFunction(id, username);
    };



    socket.on("socketId", onSocketIdReceived);

    socket.on("mediaStatusChanged", ({ mediaType, isActive }) => {
      if (isActive !== null) {
        if (mediaType === "video") {
          setIsPartnerVideoActive(isActive);
        } else if (mediaType === "audio") {
          setIsPartnerMicActive(isActive);
        } else {
          setIsPartnerMicActive(isActive[0]);
          setIsPartnerVideoActive(isActive[1]);
        }
      }
    });

    socket.on("callTerminated", () => {
      window.location.reload()
      setIsCallEnded(true);
                
   
    });

    socket.on("incomingCall", ({ from, name, signal }) => {
      setCall({ isReceivingCall: true, from, name, signal });
    }); 

    socket.on("receiveMessage", ({ message: text, senderName }) => {
      const receivedMsg = { text, senderName };
      setReceivedMessage(receivedMsg);

      const timeout = setTimeout(() => {
        setReceivedMessage({});
      }, 1000);

      return () => clearTimeout(timeout);
    });
  };

  const customFunction = async (id, username) => {
    
    // Your custom logic goes here
    // console.log(`Received socketId: ${id}, Username: ${username}`);

    const SendCallData ={
      socketID : id,
      UserName : username
    }

    try {
      const response = await axios.post(
        `${baseURL}/users/send/vedio-call/userdata`,
        SendCallData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {

        try {
        const response = await axios.get(
          `${baseURL}/users/get/vedio-call/${username}`
        );
        if (response.data.status === 200) {
          console.log(response.data.data[0]);
          const my_socket_id = response.data.data[0].socketid;
          setMyUserId(my_socket_id);
          // Process success if needed
        } else {
          // Handle failure if needed
        }
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }



       
        console.log('data save ')
      }
    } catch (error) {}
    
  };

  getUserMediaStream();
  handleSocketEvents();
}, []);


  const receiveCall = () => {
    setIsCallAccepted(true);
    setPartnerUserId(call.from);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName: name,
        mediaType: "both",
        mediaStatus: [isMyMicActive, isMyVideoActive],
      });
    });

    peer.on("stream", (currentStream) => {
      if (partnerVideoRef.current) {
        partnerVideoRef.current.srcObject = currentStream;
      }
    });
    peer.signal(call.signal);
    peerConnectionRef.current = peer;
  };

  const callUser = (targetId) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStream,
    });
    setPartnerUserId(targetId);

    const handleSignal = (data) => {
      socket.emit("initiateCall", {
        targetId,
        signalData: data,
        senderId: myUserId,
        senderName: name,
      });
    };

    const handleStream = (currentStream) => {
      partnerVideoRef.current.srcObject = currentStream;
    };

    const joinAcceptedCall = ({ signal, userName }) => {
      setIsCallAccepted(true);
      setOpponentName(userName);
      peer.signal(signal);
      socket.emit("changeMediaStatus", {
        mediaType: "both",
        isActive: [isMyMicActive, isMyVideoActive],
      });
    };

    peer.on("signal", handleSignal);
    peer.on("stream", handleStream);
    socket.on("callAnswered", joinAcceptedCall);

    peerConnectionRef.current = peer;
  };

  const toggleVideo = () => {
    const newStatus = !isMyVideoActive;
    setIsMyVideoActive(newStatus);

    userStream.getVideoTracks().forEach((track) => {
      track.enabled = newStatus;
    });

    socket.emit("changeMediaStatus", {
      mediaType: "video",
      isActive: newStatus,
    });

    return newStatus;
  };

  const toggleMicrophone = () => {
    const newStatus = !isMyMicActive;
    setIsMyMicActive(newStatus);

    userStream.getAudioTracks().forEach((track) => {
      track.enabled = newStatus;
    });

    socket.emit("changeMediaStatus", {
      mediaType: "audio",
      isActive: newStatus,
    });

    return newStatus;
  };

  const toggleScreenSharingMode = () => {
    if (!isMyVideoActive) {
      alert("Please turn on your video to share the screen");
      return;
    }
    if (!isScreenSharing) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((screenStream) => {
          const screenTrack = screenStream.getTracks()[0];
          const videoTracks = peerConnectionRef.current.streams[0].getTracks();
          const videoTrack = videoTracks.find(
            (track) => track.kind === "video"
          );
          peerConnectionRef.current.replaceTrack(
            videoTrack,
            screenTrack,
            userStream
          );
          screenTrack.onended = () => {
            peerConnectionRef.current.replaceTrack(
              screenTrack,
              videoTrack,
              userStream
            );
            myVideoRef.current.srcObject = userStream;
            setIsScreenSharing(false);
          };
          myVideoRef.current.srcObject = screenStream;
          screenShareTrackRef.current = screenTrack;
          setIsScreenSharing(true);
        })
        .catch((error) => {
          console.log("Failed to get screen sharing stream");
        });
    } else {
      screenShareTrackRef.current.stop();
      screenShareTrackRef.current.onended();
    }
  };

  const toggleFullScreen = (e) => {
    const element = e.target;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const endCall = () => {
    setIsCallEnded(true);
    socket.emit("terminateCall", { targetId: partnerUserId });
    peerConnectionRef.current.destroy();
    window.location.reload();
  };

  const endIncomingCall = () => {
    socket.emit("terminateCall", { targetId: partnerUserId });
  };

  const sendMessage = (text) => {
    const newMessage = {
      message: text,
      type: "sent",
      timestamp: Date.now(),
      sender: name,
    };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("sendMessage", {
      targetId: partnerUserId,
      message: text,
      senderName: name,
    });
  };

  return (
    <VideoCallContext.Provider
      value={{
        call,
        isCallAccepted,
        myVideoRef,
        partnerVideoRef,
        userStream,
        name,
        setName,
        setMyUserId,
        isCallEnded,
        myUserId,
        setCall,
        callUser,
        endCall,
        receiveCall,
        sendMessage,
        receivedMessage,
        chatMessages,
        setChatMessages,
        setReceivedMessage,
        setPartnerUserId,
        endIncomingCall,
        opponentName,
        isMyVideoActive,
        setIsMyVideoActive,
        isPartnerVideoActive,
        setIsPartnerVideoActive,
        toggleVideo,
        isMyMicActive,
        isPartnerMicActive,
        toggleMicrophone,
        isScreenSharing,
        toggleScreenSharingMode,
        toggleFullScreen,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};

export { VideoCallContext, VideoCallProvider };