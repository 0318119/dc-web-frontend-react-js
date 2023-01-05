import React, { useState } from 'react'
import styled_Forgot from './css/forgot-password.module.css'
import User_img from './images/Group8709.svg'
import logo from './images/dc_logo.svg'
import BaseURl from "./BaseURl";
import axios from 'axios'
import Config from './Config';

function ForgotPassword() {
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError,] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")
    
    const showAlert = (message, type) => {
        setError({
            message: message,
            type: type
        })
    }

    
    const ForgotPasswordClick = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setBtnEnaledAndDisabled(true)
        
        try {
            <BaseURl />
            await axios({
                method: 'post',
                url: '/api/v01/forgot-password',
                data: {
                    user_email: userEmail,
                    base_url_for_reset_password: process.env.REACT_APP_RESET_PWD_URL,
                    request_type: "WEB"
                },
            })
            .then((response) => {
                if(response.data.success){
                    showAlert(response.data.success.message,"success")
                    setLoading(false)
                    setBtnEnaledAndDisabled(false)
                }else{
                    if(response.data.failed){
                        showAlert(response.data.failed.message,"warning")
                        setLoading(false)
                        setBtnEnaledAndDisabled(false)
                    }
                }
            })
        } catch (response) { 
            setLoading(false)
            setBtnEnaledAndDisabled(false)
            showAlert(response.message,"warning")
         }
    }

    return (
        <>
            <div className="container">
                {(() => {
                    let isUser = JSON.parse(localStorage.getItem('User'))
                    if ("User" in localStorage && isUser === false){
                        return ( <Config /> )
                    }else if("User" in localStorage && isUser === true){
                        return ( <Config /> )
                    }
                })()}
                <div className="row">
                    <div className="col-md-6 p-0 d-md-block d-none">
                        <div className={`${styled_Forgot.img_user}`}>
                            <img src={User_img} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className={`${styled_Forgot.forgotpwd_box}`}>
                            <div className={`${styled_Forgot.logoBox}`}>
                                <img src={logo} alt="" />
                                <h4>Forgot Password</h4>
                                <ul>
                                    {error && (
                                        <li className={`alert alert-${error.type}` + " "+ "mt-4"}>{`${error.message}`}</li>
                                    )}
                                </ul>
                            </div>
                            <form onSubmit={ForgotPasswordClick}>
                                <div className="form-group">
                                    <input type="email" className="form-control mt-4" placeholder="Enter email address" 
                                    value={userEmail} name="userEmail"
                                    onChange={e => setUserEmail(e.target.value)} required
                                    />
                                </div>
                                <button disabled={btnEnaledAndDisabled}>{loading ? "A moment please..." : "Submit"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
