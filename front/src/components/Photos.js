import React from 'react'
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Images from "../assets/default-profile.png"; 
import SendIcon from '@material-ui/icons/Send';

export default function Photos() {
  return (
    
        <div className='uplaod-photos-wrapper posts-wrapper'>
       <div className="posts-right-side">
           <div  className='upload-post-wrapper'>
            <h3>Upload Photos</h3>
            
            <div className='post-title-box'>
            <div className="post-image">
                <img src={Images} alt="" />
            </div>
            <input type="text" className='post-title' placeholder='Enter post title' />
            </div>
            <button className='post-btn btn'>Upload Photo</button>
            <input type="file" name="" id="" className='upload-photo' />
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
          </div>


    </div>
     
  )
}
