import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ConfirmAddr from "./components/ConfirmAddr";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import UserProfile from "./containers/UserProfile";
import NotFound from "./containers/NotFound";
import Messages from "./components/messages";
import Search from "./containers/Search";
import Posts from "./components/Posts";
import About from "./components/About";
import Sidebar from "./components/Sidebar";
import Photos from "./components/Photos";
import NavBar from "./components/NavBar";
import UpgradePlan from "./components/UpgradePlan";
import Payment from "./components/Payment";
import EditProfileImage from "./components/EditProfileImage";
import Followers from "./components/Followers";
import Vedio_Call from "./containers/Vedio_Call";
import { GoogleOAuthProvider } from "@react-oauth/google";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Cards from "./containers/Cards";
import SwipeCards from "./containers/CardMain";
import HomePage from "./containers/Home/MainScreen";
import IncomingCall from "./components/IncomingCall/IncomingCall";
import AdminLogin from "./containers/Admin/AdminLogin";
import AdminDashboard from "./containers/Admin/AdminDashboard";
const SidebarLayout = ({ component: Component, ...rest }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    // Check if the screen size is mobile (below 768px)
    const checkMobileScreen = () => {
      setMobileScreen(window.innerWidth <= 767);
    };

    checkMobileScreen(); // Initial check

    window.addEventListener("resize", checkMobileScreen); // Update on screen resize

    return () => {
      window.removeEventListener("resize", checkMobileScreen); // Cleanup event listener
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard-wrapper" style={{ display: "flex", width: "100%" }}>
    

      {/* Show Sidebar only if visible or on larger screens */}
      {isSidebarVisible || !isMobileScreen ? (
        <div className="left-panel">
          <Sidebar closeSidebar={toggleSidebar} />
        </div>
      ) : null}

      {isMobileScreen && (
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarVisible ? "Hide Sidebar" : <KeyboardBackspaceIcon />}
        </button>
      )}


      {/* Conditionally hide the right panel on mobile when sidebar is visible */}
      {!isSidebarVisible || !isMobileScreen ? (
        <div className="right-panel">
          <Component {...rest} />
        </div>
      ) : null}
    </div>
  );
};

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          
          <Route exact path="/" component={App} />
          <Route path="/users/login" component={Login} />
          <Route path="/users/register" component={Register} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />

          <Route path="/users/register-activate/:key" component={ConfirmAddr} />
          <Route path="/users/forgot-password" component={ForgotPassword} />
          <Route path="/users/reset-password/:key" component={ResetPassword} />
          <Route path="/users/profile/:username" component={UserProfile} />
          <Route path="/video-call/:username/:friend" component={Vedio_Call} />
          <Route path="/chat/messages" component={Messages} />
          <Route path="/main/search" component={Search} />
          <Route path="/users/cards" component={SwipeCards} />
          <Route path="/home" component={HomePage} />
          <Route path="/call" component={IncomingCall} />



         { /* Sidebar with Posts route */}
          <Route path="/users/posts" render={(props) => <SidebarLayout component={Posts} {...props} />} />
          <Route path="/users/about" render={(props) => <SidebarLayout component={About} {...props} />} />
          <Route path="/users/photos" render={(props) => <SidebarLayout component={Photos} {...props} />} />
          <Route path="/users/editprofileimage" render={(props) => <SidebarLayout component={EditProfileImage} {...props} />} />
          <Route path="/users/followers" render={(props) => <SidebarLayout component={Followers} {...props} />} />
          <Route path="/users/upgradeplan/:id" render={(props) => <SidebarLayout component={UpgradePlan} {...props} />} />
          <Route path="/users/buyplan/:id"  render={(props) => <SidebarLayout component={Payment} {...props} />}/>
          <Route path="/users/upgradeplan/:id" render={(props) => <SidebarLayout component={UpgradePlan} {...props} />} />
          <Route path="/users/buyplan/:id"  render={(props) => <SidebarLayout component={Payment} {...props} />}/>


          {/* Catch-all for 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}