import React from 'react'
import Images from "../assets/default-profile.png"; 

export default function EditProfileImage() {
  return (
    <div className='edit-profile-img-wrapper'>
        <div className='edit-profile-img-card'>
            <img src={Images} alt="" />
        </div>
        <div className='upload-edit-img'>
        <input type="file" name="" id="" className='upload-photo' />
        </div>
    </div>
  )
}
