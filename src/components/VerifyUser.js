import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled_otp from './css/otp.module.css'
import User_img from './images/Group8709.svg'
import logo from './images/dc_logo.svg'
import BaseURl from './BaseURl';
import axios from 'axios';
import Config from './Config'

export default function VerifyUser(props) {
    const [OTP, setOTP] = useState("");
    const [OTPMsg, setOTPMsg] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")
    const [reSentBtnEnaledAndDisabled, setResentBtnEnaledAndDisabled] = useState("")
    const user_email = JSON.parse(localStorage.getItem("USER EMAIL"))
    const navigate = useNavigate()

    const showAlert = (message, type) => {
        setError({
            message: message,
            type: type
        })
    }
    const SubMitOtpHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        <BaseURl />;
        try {
            await axios({
                method: 'post',
                url: '/api/b2c/v01/verifyotp',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    email: user_email,
                    otp : OTP,
                    request_type: "WEB"
                },
            }).then((response) => {
                    setLoading(false);
                    setBtnEnaledAndDisabled(false);
                if(response.data.success){
                    showAlert(response.data.success.message,"success")
                    navigate("/Dashboard")
                    const user_email = JSON.parse(localStorage.getItem("USER EMAIL"))
                    if(user_email){
                        localStorage.removeItem("USER EMAIL")
                        localStorage.setItem('User', JSON.stringify(false));
                        JSON.parse(localStorage.getItem('User'))
                    }
                }else{
                    if(response.data.failed.data){
                        showAlert(response.data.failed.data,"warning")
                    }
                }
            })
        }catch (response){
            showAlert(response.message,"warning")
        }
    }

    const resentOtpHandler = async (e) => {
        e.preventDefault();
        setOTPMsg(true);
        setResentBtnEnaledAndDisabled(true);
        <BaseURl />;
        try {
            await axios({
                method: 'post',
                url: '/api/b2c/v01/resend_otp',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    email: user_email,
                    request_type: "WEB"
                },
            }).then((response) => {
                setOTPMsg(false);
                setResentBtnEnaledAndDisabled(false);

            })
        }catch (response){
            showAlert(response.message,"warning")
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                {(() => {
                    let isUser = JSON.parse(localStorage.getItem('User'))
                    if ("User" in localStorage && isUser == false){
                        return ( <Config /> )
                    }if(isUser == true){
                        return true
                    }else{ return ( <Config /> )}
                })()}
                    <div className="col-md-6" id={`${styled_otp.hideBox}`}>
                        <div className={`${styled_otp.img_user}`} >
                            <img src={User_img} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6" id={`${styled_otp.fullWidthBox}`}>
                        <div className={`${styled_otp.otp_box}`}>
                            <div className={`${styled_otp.logoBox}`}>
                                <img src={logo} alt="" />
                                <h4>Verify OTP</h4>
                                <ul>
                                    {error && (
                                        <li className={`alert alert-${error.type}` + " "+ "mt-4"}>{`${error.message}`}</li>
                                    )}
                                </ul>
                                <div className={`${styled_otp.messageBox}`}>

                                    <form onSubmit={SubMitOtpHandler}>
                                        <h4>OTP has been sent to your resgistered 
                                            email address, please verify your account 
                                            <b> <b>Note : Your OTP has exprie in a one minute</b></b>
                                        </h4>
                                        <div className="form-group">
                                            <input type="text" className="form-control mt-4" placeholder="OTP" required
                                                value={OTP} name="userEmail"
                                                onChange={e => setOTP(e.target.value)}
                                            />
                                        </div>
                                        <button className={`${styled_otp.submmitBtn}`} disabled={btnEnaledAndDisabled}>{loading ? "A moment please..." : "Verify OTP"}</button>
                                    </form>
                                    <div className={`${styled_otp.reSentBtnBox}`}>
                                        <button className={`${styled_otp.reSentBtn}`} onClick={resentOtpHandler} disabled={reSentBtnEnaledAndDisabled}>{OTPMsg? "A moment please..." :"Resent OTP"}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
