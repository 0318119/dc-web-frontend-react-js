import React, { useState, Component } from "react";
import ReactPhoneInput from "react-phone-input-2";
import { Link, useNavigate } from 'react-router-dom'
import BaseURl from "./BaseURl";
import axios from 'axios'
import Slider from "react-slick";

import styled_register from './css/register.module.css'
import UserImg from './images/user.svg'
import siteLogo from './images/dc_logo.svg';
import showPwdImg from './images/show.svg';
import hidePwdImg from './images/hide.svg';
import slide_icon from './images/Slide_Arrow.svg'
import Config from "./Config";

export default function Register(props) {
    const [registerFirstname, setFirstName] = useState("");
    const [registerLastname, setLastName] = useState("");
    const [registerContact, setRegisterContact] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setregisterPassword] = useState("");
    const [registerConPassword, setregisterConPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isConfirmPwd, setIsConfirmPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError,] = useState(false);
    const [btnEnaledAndDisabled, setBtnEnaledAndDisabled] = useState("")

    const navigate = useNavigate()
    const showAlert = (message, type) => {
        setError({
            message: message,
            type: type
        })
    }
     JSON.parse(localStorage.getItem('User'))

    const registerHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setBtnEnaledAndDisabled(true);
        <BaseURl />;
        try {
            await axios({
                method: 'post',
                url: '/api/b2c/v01/signup',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    first_name: registerFirstname,
                    last_name: registerLastname,
                    contact: registerContact,
                    email: registerEmail,
                    password: registerPassword,
                    password_confirmation: registerConPassword,
                    is_verified: 0,
                    request_type: "WEB"
                },
            }).then((response) => {
                setBtnEnaledAndDisabled(false);
                setLoading(true)
                if (response.data.error === false) {
                    setLoading(false)
                    showAlert(response.data['message'],"success")
                    console.log("true",response)
                    
                    // SET EMAIL AND GET  USER EMAIL IN LOCAL STORAGE
                    localStorage.setItem("USER EMAIL", JSON.stringify(registerEmail))
                    JSON.parse(localStorage.getItem("USER EMAIL"))

                    const acess_token = response.data.results.tokens.access_token;
                    localStorage.setItem('AUTH_TOKEN', JSON.stringify(acess_token));
                    JSON.parse(localStorage.getItem('AUTH_TOKEN'))

                    // SET USER F_NAME AND GET  USER EMAIL IN LOCAL STORAGE
                    localStorage.setItem('F_Name', JSON.stringify(registerFirstname));
                    JSON.parse(localStorage.getItem('F_Name'))

                    localStorage.setItem('User', JSON.stringify(true));
                    JSON.parse(localStorage.getItem('User'))

                    // SET USER L_NAME AND GET  USER EMAIL IN LOCAL STORAGE
                    localStorage.setItem('L_Name', JSON.stringify(registerLastname));
                    JSON.parse(localStorage.getItem('L_Name'))
                    navigate("/VerifyUser")
                } else {
                    setLoading(false)
                    showAlert(response.data['message'],"warning")
                }
                setLoading(false)
            })
        }
        catch (response) {
            showAlert(response.message,"warning")
            setLoading(false);
            setBtnEnaledAndDisabled(false);
        }
    }



    return (
        <>
            <section className={`${styled_register.formBody}`}>
                {(() => {
                    let isUser = JSON.parse(localStorage.getItem('User'))
                    if ("User" in localStorage && isUser === false){
                        return ( <Config /> )
                    }else if ("User" in localStorage && isUser === true){
                        return ( <Config /> )
                    }
                })()}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 p-0 m-0" id={`${styled_register.hiddenSlider}`}>
                            <div className={`${styled_register.formBox}` + " " + "boxSliding"}>
                                <FormSlider />
                            </div>
                        </div>
                        <div className="col-6 p-0 m-0" id={`${styled_register.fullWidthForm}`}>
                            <div className={`${styled_register.registerBox}`}>
                                <form onSubmit={registerHandler}>
                                    <div className={`${styled_register.formLogo}`}>
                                        <img src={siteLogo} alt="" />
                                    </div>

                                    <ul className={`${styled_register.errorMessage}`}>
                                        {error && (
                                            <li className={`alert alert-${error.type}` + " "+ "mt-4"}>{`${error.message}`}</li>
                                        )}
                                    </ul>

                                    <div className="row">
                                        <div className="col mt-3" id={`${styled_register.namingBox}`}>
                                            <label>first Name</label>
                                            <input type="text" value={registerFirstname} name="registerFirstname"
                                                onChange={e => setFirstName(e.target.value)}
                                                className="form-control" required />
                                        </div>
                                        <div className="col mt-3" id={`${styled_register.namingBox}`}>
                                            <label> Last Name</label>
                                            <input type="text" value={registerLastname} name="registerLastname"
                                                onChange={e => setLastName(e.target.value)}
                                                className="form-control" required />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Mobile</label> <br />
                                                <ReactPhoneInput
                                                    specialLabel=""
                                                    placeholder="(+ 92 )-_ _ _-_ _ _ _ _ _"
                                                    value={registerContact}
                                                    onChange={setRegisterContact}
                                                    onlyCountries={["pk"]}
                                                    keys={true}
                                                />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Email address</label>
                                            <input type="email" value={registerEmail} name="registerEmail"
                                                onChange={e => setRegisterEmail(e.target.value)}
                                                className="form-control" required />
                                        </div>
                                        <div className="col mt-3" id={`${styled_register.passwordBox}`}>
                                            <label>Password</label>
                                            <input value={registerPassword} name="registerPassword"
                                            email="hamzaaaaaaaa"
                                                onChange={e => setregisterPassword(e.target.value)}
                                                type={isConfirmPwd ? "text" : "password"}
                                                className="form-control" required />
                                            <img
                                                title={isConfirmPwd ? "Hide password" : "Show password"}
                                                src={isConfirmPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => setIsConfirmPwd(prevState => !prevState)} alt=""
                                            />
                                        </div>
                                        <div className="col mt-3" id={`${styled_register.passwordBox}`}>
                                            <label>confirm password</label>
                                            <input value={registerConPassword} name="registerConPassword"
                                                onChange={e => setregisterConPassword(e.target.value)}
                                                className="form-control" required
                                                type={isRevealPwd ? "text" : "password"} />
                                            <img
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => setIsRevealPwd(prevState => !prevState)} alt=""
                                            />
                                        </div>
                                        <button className={`${styled_register.signUpBtn}`} type="submit" disabled={btnEnaledAndDisabled}>  {loading ? "A moment please..." : " Sign up"}</button>
                                        <li className={`${styled_register.redirectLink}`}><p>Have an account?<span><Link to="/">Sign in</Link></span></p></li>
                                        <p className={`${styled_register.reserved}`}> Copyright Ⓒ 2022 Double Check All Rights Reserved | Powered By Tech Exons</p>
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
            className: `${styled_register.formSliding}`
        };
        return (
            <div className={`${styled_register.formPicture}`}>
                <Slider {...settings}>
                    <div className={`${styled_register.sliderItem}`}>
                        <div className={`${styled_register.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_register.indicators_box}`}>
                            <button>Sign up <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                    <div className={`${styled_register.sliderItem}`}>
                        <div className={`${styled_register.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_register.indicators_box}`}>
                            <button>Sign up  <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                    <div className={`${styled_register.sliderItem}`}>
                        <div className={`${styled_register.innerItem}`}>
                            <h4>Welcome to Double Check. Start your verification journey</h4>
                            <img src={UserImg} alt="" />
                        </div>
                        <div className={`${styled_register.indicators_box}`}>
                            <button>Sign up <img src={slide_icon} alt="" /></button>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
