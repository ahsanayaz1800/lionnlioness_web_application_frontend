import React, { useEffect } from "react";
import Video from "../components/Video/Video";
import FormCard from "../components/FormCard/FormCard";
import IncomingCall from "../components/IncomingCall/IncomingCall";
import { connect } from "react-redux";
import { VideoCallProvider } from "../context/Context";
import '../styles/App.css'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/reset.css";

const Vedio_Call = ({ userConnectedData, userConnectedStatus }) => {
  useEffect(() => {
    // Check if the URL already contains the 'reloaded' query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const reloaded = urlParams.get("reloaded");

    // If the 'reloaded' parameter is not present, reload the page and add the parameter
    if (!reloaded) {
      urlParams.set("reloaded", "true");
      window.location.search = urlParams.toString();
    }
  }, []);

  let url = document.location.href;
  let friendname = url.split("/").pop(); // Get the last part of the URL
  friendname = friendname.split("?")[0]; // Remove any query string
  const username = userConnectedData.username;

  
  return (
    <div>
      <VideoCallProvider >
        <Video />
        <FormCard />
        <IncomingCall />
      </VideoCallProvider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status,
  };
};

export default connect(mapStateToProps)(Vedio_Call);