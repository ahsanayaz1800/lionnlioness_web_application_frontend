import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HomeLogged from '../containers/HomeLogged';
import "../styles/App.css";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export default function Dashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [isMobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    // Check if the screen size is mobile (below 768px)
    const checkMobileScreen = () => {
      setMobileScreen(window.innerWidth <= 767);
    };

    checkMobileScreen(); // Initial check

    window.addEventListener('resize', checkMobileScreen); // Update on screen resize

    return () => {
      window.removeEventListener('resize', checkMobileScreen); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    // Assume a function checkUserAuthentication checks if the user is logged in
    const userLoggedIn = checkUserAuthentication(); 
    setUserLoggedIn(userLoggedIn);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className='dashboard-wrapper'>
      {isUserLoggedIn && isMobileScreen && (
        <div className={`main-wrapper ${isSidebarVisible ? 'sidebar-open' : ''}`}>
          {isSidebarVisible ? (
            <Sidebar closeSidebar={toggleSidebar} />
          ) : (
            <HomeLogged />
          )}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarVisible ? ' ' : <KeyboardBackspaceIcon /> }
          </button>
        </div>
      )}

      {isUserLoggedIn && !isMobileScreen && (
        <div className='main-wrapper'>
        <Sidebar />
        <HomeLogged />
        </div>



      )}
    
    </div>
  );
}

const checkUserAuthentication = () => {
  // Replace with actual authentication logic
  return true; // Return true or false based on user login status
};