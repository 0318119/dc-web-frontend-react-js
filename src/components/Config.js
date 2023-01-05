import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"


function Config() {

  const navigate = useNavigate()
  const User = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if ("AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null && User == false) {
        navigate('/Dashboard')
    }
    else if("AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null && User == true){
      navigate('/VerifyUser')
    }
    else{
      navigate('/')
    }
  },[]);
  return (
    <></>
  )
}

export default Config
