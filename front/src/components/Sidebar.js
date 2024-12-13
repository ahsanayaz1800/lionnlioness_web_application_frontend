import React, { useState, useEffect } from "react";
import { connect } from "react-redux"; // Import connect
import "materialize-css/dist/css/materialize.min.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Accordion from "./Accordion";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const baseURL = process.env.REACT_APP_BASE_URL;

const Sidebar = ({ userConnectedData }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await Axios.get(`${baseURL}/admin/get_all_packages`);
        if (response.data) {
          setPackages(response.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    console.log('userConnectedData in Sidebar:', userConnectedData);
  }, [userConnectedData]);

  return (
    <div className="sidebar-wrapper left-panel-sidebar">
      <NavBar />

      <div className="packages-wrapper">
        {packages.map((pkg) => (
          <Link
            to={{
              pathname: `/users/upgradeplan/${pkg.id}`,
              state: {
                id: pkg.id,
                title: pkg.title,
                price: pkg.price,
                duration: pkg.duration,
              },
            }}
            key={pkg.id}
          >
            <div className={`package-item ${pkg.title.toLowerCase()}-item`}>
              <p className="label">
                Lion & Lioness <span className={pkg.title.toLowerCase()}>{pkg.title}</span>
              </p>
              <span>Level up every action you take on Lionnlioness</span>
            </div>
          </Link>
        ))}
      </div>
      {/* <h3>Menu</h3>
              <ul className="sidebar-links">
                <li><a href="/users/posts">Posts <ArrowRightAltIcon  /> </a></li>
                <li><a href="/users/about">About   <ArrowRightAltIcon  /> </a></li>
                <li><a href="/users/followers">Followers   <ArrowRightAltIcon  /> </a></li>
                <li><a href="/users/photos">Photos   <ArrowRightAltIcon  /> </a></li>
                <li><a href="">Find The Hotel   <ArrowRightAltIcon  /> </a></li>
                <li><a href="/users/upgradeonenightstand">One Night Stand   <ArrowRightAltIcon  /> </a></li>
                <li><a href="/users/editprofileimage">Edit Profile Image<ArrowRightAltIcon  />    </a></li>
              </ul>

              <div class="verification-btn" bis_skin_checked="1"> <a href="https://lionnlioness-v2.devservertd.com/public/verify_gmail">Click to verify your email</a></div> */}

      <h3>Account Settings</h3>
      <Accordion user={userConnectedData} />

      {/* <form action="" method="POST">
        <input type="hidden" name="_token" value="eg1b2yyZYk06x3SgHGXxCWrHboY0te2WMoUeVzdU" />
        <input type="hidden" name="user_id" value="159" />
        <button type="submit" className="delete-account-btn">Delete my account permanently</button>
      </form> */}
    </div>
  );
};

// Map Redux state to Sidebar props
const mapStateToProps = (state) => ({
  userConnectedData: state.user.data,
});

export default connect(mapStateToProps)(Sidebar);
