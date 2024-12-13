import React,{useEffect, useState} from 'react'
import { Button, Icon } from "react-materialize";
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Images from "../assets/default-profile.png"; 
import SendIcon from '@material-ui/icons/Send';
import NavBar from './NavBar';
import Post from './modals/Post';
export default function UploadPosts({user}) {
  return ( 
    <div className="posts-right-side">
           <div  className='upload-post-wrapper'>
            <h3>Upload Post</h3>
            <div className='post-title-box'>
            <div className="post-image">
                <img src={user.profile_picture_url} alt="" />
            </div>
            
<Button
  className="post-title modal-trigger"
  href="#post"
>
  Upload Post
</Button>
            {/* <Button
          floating
          tooltip="post"
          className="post-title modal-trigger"
          href="#post"
        /> */}


            </div>
            {/* <button className='post-btn btn'>POST</button> */}
           </div>

           {/* <div className='post-uploaded'>
            <div className='post-uplaoded-details'>
            <p>Capturing moments is my passion. When I'm not behind the camera, I love spending time outdoors or cooking up something new in the kitchen.
            </p> 
            <DeleteIcon />
            </div>
            <div className="uploaded-post-img">
            <img src={Images} alt="" />
            </div>
            <div className='post-uploaded-btns'>
                <button><ThumbUpAltIcon /> Like</button>
                <button><ModeCommentIcon />Comments</button>
            </div>
            <a href=''> View All </a>
            <div className='comment-wrapper'>
            <input type="text" className='comment-box'  />
            <div className="send-btn">
                <button><SendIcon /> </button>
            </div>
            </div>
            <div className='post-title-box'>
            <div className="post-image">
                <img src={Images} alt="" />
            </div>
            <input type="text" className='post-title'   />
            </div>
            <p className='post-upload-time'>2 weeks ago</p>
           </div> */}
          </div>
         
  )
}
