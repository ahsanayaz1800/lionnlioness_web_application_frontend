import React from 'react' 
import UploadPosts from './UploadPosts';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Images from "../assets/default-profile.png"; 
import SendIcon from '@material-ui/icons/Send';
import NavBar from './NavBar';
 
export default function Posts() {
  return (
      <div className='right-panel-wrapper'>
        {/* <NavBar /> */}
    <div className='posts-wrapper'>
        <div className='posts-left-side'>
         <div className='info-wrapper'>
            <h2>Info</h2>
            <div className='info-details'>
            <p><PaymentIcon /> <span>FREE SUBSCRIPTION</span> </p>
            <p><HomeIcon /> <span>LIVE</span> </p>
            <p><WatchLaterIcon /> <span> Joined 2024-09-05 09:04:45</span> </p>
            </div>
            <button>More Info</button>
            <button>Change Password</button> 
         </div>
         <div className='my-photos-wrapper'>
         <h2>Photos</h2>
         <div className='my-photos'>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
         </div>
         </div>
         <div className='my-friends-wrapper'>
         <h2>Friends</h2>
         <div className='my-friends'>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
            <div className='img-box'>
                <img src={Images} alt="" />
            </div>
         </div>
         </div>
          </div>
         <UploadPosts />

    </div>
    </div>
  )
}
