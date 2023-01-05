import React, { useState, Component } from "react";
import { Link, useNavigate } from 'react-router-dom'
import BaseURl from "./BaseURl";
import axios from 'axios'
import Slider from "react-slick";

import styled_login from './css/login.module.css'
import UserImg from './images/user.svg'
import siteLogo from './images/dc_logo.svg';
import showPwdImg from './images/show.svg';
import hidePwdImg from './images/hide.svg';
import slide_icon from './images/Slide_Arrow.svg'
import Config from "./Config";


function Login() {
   
    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginrPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [error, setError,] = useState();
    const [loading, setLoading] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")
    const navigate = useNavigate()
    
    const showAlert = (message, type) => {
        setError({
            message: message,
            type: type,
            checone: false,
            check_two: true
        })
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        <BaseURl />;
        try {
            await axios({
                method: 'post',
                url: '/api/v01/login',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    email: loginEmail,
                    password: loginPassword,
                    client_id: 3,
                    client_secret: "R42m8SEh2Yx1XnRKMOgNyZzgk9FzKd1rU6MDcpCq",
                    request_type: "WEB",
                },
            })
                .then((response) => {
                    setBtnEnaledAndDisabled(false);
                    if(response.data.success){
                        setLoading(false)
                        showAlert(response.data.success.message,"success")
                        const acess_token = response.data.success.data.tokens.access_token;

                        localStorage.setItem('AUTH_TOKEN', JSON.stringify(acess_token));
                        JSON.parse(localStorage.getItem('AUTH_TOKEN'))

                        const firstName = response.data.success.data.first_name;
                        localStorage.setItem('F_Name', JSON.stringify(firstName));
                        JSON.parse(localStorage.getItem('F_Name'))

                        const lastName = response.data.success.data.last_name;
                        localStorage.setItem('L_Name', JSON.stringify(lastName));
                        JSON.parse(localStorage.getItem('L_Name'))
                        
                        localStorage.setItem('User', JSON.stringify(false));
                        JSON.parse(localStorage.getItem('User'))

                        navigate("/Dashboard")
                    }else{
                        if(response.data.failed.message == "Invalid Credentials"){
                            setLoading(false)
                            showAlert(response.data.failed.message,"warning")
                        }else{
                            if(response.data.failed.message == "verification_failed"){
                                setLoading(false)
                                showAlert(response.data.failed.message,"warning")
                                navigate("/VerifyUser")
                             }
                        }
                    }
                })
                setLoading(false)
                setBtnEnaledAndDisabled(false);
        }
        catch (response){
            setLoading(false)
            setBtnEnaledAndDisabled(false);
            showAlert(response.message,"warning")
        }
    }

    return (
        <>
            <section className={`${styled_login.login_formBody}`}>
            <Config />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 p-0 m-0" id={`${styled_login.hiddenSlider}`}>
                            <div className={`${styled_login.login_formBox}` + " " + "boxSliding"}>
                                <FormSlider />
                            </div>
                        </div>
                        <div className="col-6 p-0 m-0" id={`${styled_login.fullWidthForm}`}>
                            <div className={`${styled_login.loginBox}`}>
                                <form onSubmit={registerHandler}>
                                    <div className={`${styled_login.formLogo}`}>
                                        <img src={siteLogo} alt="" />
                                    </div>

                                    <ul>
                                        {error && (
                                            <li className={`alert alert-${error.type}` + " "+ "mt-4"}>{`${error.message}`}</li>
                                        )}
                                    </ul>
                                    <div className="row">
                                        <div className="form-group mt-3">
                                            <label>Email address</label>
                                            <input type="email" value={loginEmail} name="registerEmail"
                                                onChange={e => setloginEmail(e.target.value)}
                                                className="form-control" required />
                                        </div>
                                        <div className="col mt-3" id={`${styled_login.passwordBox}`}>
                                            <label>Password</label>
                                            <input value={loginPassword} name="registerPassword"
                                                onChange={e => setloginrPassword(e.target.value)}
                                                type={isRevealPwd ? "text" : "password"}
                                                className="form-control" required />
                                            <img
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => setIsRevealPwd(prevState => !prevState)}
                                            />
                                        </div>
                                        <div className={`${styled_login.flexInline}` + " " + "form-group" + "" + "mt-3"}>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="remember" />
                                                <label className="form-check-label" htmlFor="remember">Remember</label>
                                            </div>
                                            <div className="">
                                                <Link to='/ForgotPassword'>Forgot Password</Link>
                                            </div>
                                        </div>
                                        <button className={`${styled_login.signInBtn}`} disabled={btnEnaledAndDisabled}>  {loading ? "A moment please..." : "Sign in"}</button>
                                        <li className={`${styled_login.redirectLink}`}><p>Don't have an account?<span><Link to="/Register">Sign up</Link></span></p></li>
                                        <p className={`${styled_login.reserved}`}> Copyright Ⓒ 2022 Double Check All Rights Reserved | Powered By Tech Exons</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

class FormSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            autoPlay: false,
            dots: false,
            arrow: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: `${styled_login.formSliding}`
        };
        return (
            <div className={`${styled_login.formPicture}`}>
                <Slider {...settings}>
                    <div className={`${styled_login.sliderItem}`}>
                        <div className={`${styled_login.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_login.indicators_box}`}>
                             <button>Sign in <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                    <div className={`${styled_login.sliderItem}`}>
                        <div className={`${styled_login.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_login.indicators_box}`}>
                            <button>Sign in <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                    <div className={`${styled_login.sliderItem}`}>
                        <div className={`${styled_login.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_login.indicators_box}`}>
                            <button>Sign in <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
