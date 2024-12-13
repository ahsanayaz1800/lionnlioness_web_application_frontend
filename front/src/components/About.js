import React from 'react'
import Images from "../assets/default-profile.png";

export default function About() {
  return (
    <div className='about-card-wrapper'>
    <div className='about-card'>
        <div className='about-card-img'>
           <img src={Images} />
        </div>
        <div className='about-card-content'>
           <div className='profile-login-name'>
            <h3>Sophie Bennett</h3>
           </div>
           <div class="followers-d">
                <span> (0) Follower </span> 
                <span> &nbsp;&nbsp;&nbsp; (0) Like </span>
            </div>
            <span class="profile-status">Profile 59% Completed</span>
        </div>
    </div>

    </div>
  )
}
