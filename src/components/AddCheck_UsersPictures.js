import React from 'react'
import plus_icon from './images/plus.svg';
import user_icon from './images/User_light.svg'
import styled_fields from './css/check-fields.module.css'

function AddCheck_UsersPictures(props) {
  return (
    <>
    <div className={`${styled_fields.files_input}`}>
        <div className={`${styled_fields.file_box}`}>
            <input type="file"
                onChange={props.frontPicture_handler}
            />
            <img src={props.frontPicture ? props.frontPicture : plus_icon} alt="" />
            <label htmlFor="">Upload CNIC Front</label>
        </div>

        <div className={`${styled_fields.file_box}`}>
            <input type="file"
                onChange={props.backPicture_handler}
            />
            <img src={props.backPicture ? props.backPicture : plus_icon} alt="" />
            <label htmlFor="">Upload CNIC Back</label>
        </div>

        <div className={`${styled_fields.file_box} ${styled_fields.profile_box}`}>
            <input type="file"
                onChange={props.userPicture_handler}
            />
            <img src={props.profile ? props.profile : user_icon} alt="" />
            <label htmlFor="">Profile Picture</label>
        </div>
    </div>
      
    </>
  )
}

export default AddCheck_UsersPictures
