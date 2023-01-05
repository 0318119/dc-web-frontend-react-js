import React, { useState, useEffect } from 'react'
import { useParams, useNavigate  } from "react-router-dom"
import styled_Reset from './css/reset-password.module.css'
import User_img from './images/Group8709.svg'
import logo from './images/dc_logo.svg'
import showPwdImg from './images/show.svg';
import hidePwdImg from './images/hide.svg';
import BaseURl from "./BaseURl";
import axios from 'axios'


function ResetPassword() {

    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setretypePassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isconPwd, setIsconPwd] = useState(false);
    const [error, setError] = useState("");
    const [ apiResponse, setapiResponse] = useState([])
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")

    let params = useParams()
    const navigate = useNavigate()

    const showAlert = (message, type) => {
        setError({
            message: message,
            type: type
        })
    }

    async function getResults() {
        <BaseURl />;
        await axios({
            method: "post",
            url: '/api/v01/reset-password-token-chk',
            data: { email_token: params.resetPasswordId },
        })
        .then((response) => {
            setapiResponse(response.data.success.data.user_email)

        }).catch((error) => {
            navigate("/")
        })
    }

    useEffect(() => {
        getResults()
    },[])


    const ResetPasswordClick = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setBtnEnaledAndDisabled(true)
        try {
            <BaseURl />
            await axios({
                method: 'post',
                url: '/api/v01/reset-password',
                data: {
                    user_email: apiResponse,
                    new_password: newPassword,
                    confirm_password: retypePassword,
                    email_token: params.resetPasswordId
                },
            })
            .then((response) => {
                setLoading(false)
                setBtnEnaledAndDisabled(false)
                if(response.data.success){
                    showAlert(response.data.success.message,"success")
                    navigate("/Login")
                }else{
                    if(response.data.failed){
                        setLoading(false)
                        setBtnEnaledAndDisabled(false)
                        showAlert(response.data.failed.data,"warning")
                    }
                }
            })
        } catch (error) {
            setLoading(false)
            setBtnEnaledAndDisabled(false)
            showAlert(error.message,"warning")
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-0" id={`${styled_Reset.hideBox}`}>
                        <div className={`${styled_Reset.img_user}`}>
                            <img src={User_img} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6 p-0"  id={`${styled_Reset.fullWidthBox}`}>
                        <div className={`${styled_Reset.resetpwd_box}`}>
                            <div className={`${styled_Reset.logoBox}`}>
                                <img src={logo} alt="" />
                                <h4>Change Password</h4>
                                <ul>
                                    {error && (
                                        <li className={`alert alert-${error.type}` + " "+ "mt-4"}>{`${error.message}`}</li>
                                    )}
                                </ul>
                            </div>
                            <form action="" onSubmit={ResetPasswordClick}>
                                <h4 className={`${styled_Reset.userEmail}`}>
                                   {apiResponse}
                                </h4>
                                <div className={`${styled_Reset.eyeBox}` + " " + "form-group"}>
                                    <input className="form-control mt-4" placeholder="New Password"
                                     type={isRevealPwd ? "text" : "password"} value={newPassword}
                                     onChange={e => setNewPassword(e.target.value)} required
                                     />
                                     <img
                                        title={isRevealPwd ? "Hide password" : "Show password"}
                                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                                        onClick={() => setIsRevealPwd(prevState => !prevState)} alt=""
                                     />
                                </div>
                                <div className={`${styled_Reset.eyeBox}` + " " + "form-group"}>
                                    <input className="form-control mt-4" placeholder="Confirm Password" 
                                     type={isconPwd ? "text" : "password"} value={retypePassword}
                                     onChange={e => setretypePassword(e.target.value)} required
                                      />
                                     <img
                                        title={isconPwd ? "Hide password" : "Show password"}
                                        src={isconPwd ? hidePwdImg : showPwdImg}
                                        onClick={() => setIsconPwd(prevState => !prevState)} alt=""
                                     />
                                </div>
                                <button disabled={btnEnaledAndDisabled}>{loading ? "A moment please..." : "Set password"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
