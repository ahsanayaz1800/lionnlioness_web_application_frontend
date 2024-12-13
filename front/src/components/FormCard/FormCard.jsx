import React, { useState, useContext, useEffect } from "react";
import { VideoCallContext } from "../../context/Context";
import { MdFileCopy, MdCall, MdOutlineDone } from "react-icons/md";
import { Card, Form, Button } from "react-bootstrap";

import axios from "axios";
import "./FormCard.css";

const baseURL = process.env.REACT_APP_BASE_URL

const FormCard = () => {
  const [idToCall, setIdToCall] = useState("");

  // Extract username and friendname from URL
  let url = document.location.href;
  let username = url.split("/").slice(-2, -1)[0];
  let friendname = url.split("/").pop().split("?")[0];

  const { name, setName, callUser, isCallAccepted } =
    useContext(VideoCallContext);

  useEffect(() => {
    const fetchFriendToCall = async () => {
      // console.log(friendname)

      try {
        const response = await axios.get(
          `${baseURL}/users/get/vedio-call/${friendname}`
        );
        if (response.data.status === 200) {
          console.log(response.data.data[0]);
          const friend_socket_id = response.data.data[0].socketid;
          setIdToCall(friend_socket_id);
          // Process success if needed
        } else {
          // Handle failure if needed
        }
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    if (friendname) fetchFriendToCall();
  }, [friendname, callUser]);

  // Initialize name with username when component mounts
  useEffect(() => {
    setName(username);
  }, [username, setName]);

  // useEffect(() => {
  //   const fetchMyIDToCall = async () => {
  //     // console.log(friendname)

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/users/get/vedio-call/${username}`
  //       );
  //       if (response.data.status === 200) {
  //         console.log(response.data.data[0]);
  //         const my_socket_id = response.data.data[0].socketid;
  //         setMyUserId(my_socket_id);
  //         // Process success if needed
  //       } else {
  //         // Handle failure if needed
  //       }
  //     } catch (error) {
  //       console.error("There was an error fetching the user!", error);
  //     }
  //   };

  //   if (username) fetchMyIDToCall();
  // }, [username]);

  return (
    <>
      {!isCallAccepted && (
        <div className="form-section">
          <Card className="form-card">
            <Form noValidate autoComplete="off">
              <Form.Group controlId="name" className="d-none">
                <Form.Label className="form-label">Your Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  className="form-input"
                  placeholder="Enter your name"
                  readOnly // Optional: make it read-only if you don't want the user to edit
                />
              </Form.Group>

              <Form.Group controlId="idToCall" className="d-none">
                <Form.Label className="form-label">ID to call</Form.Label>
                <Form.Control
                  type="text"
                  value={idToCall}
                  className="form-input"
                  placeholder="Enter the ID to make a call"
                  readOnly // Optional: make it read-only if you don't want the user to edit
                />
              </Form.Group>

              <Button
                className="form-main-btn"
                onClick={() => callUser(idToCall)}
              >
                <MdCall size={20} /> Call
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default FormCard;