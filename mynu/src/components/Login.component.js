import React, { Component} from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Logout_Navbar from "./Logout_Navbar.component";
import Navbar from "./Navbar.component";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (response) => {
        var decoded = jwt_decode(response.credential);
        console.log(decoded);


        const profile = {
            username: decoded.name,
            email: decoded.email
        }

        const res = await axios.post('http://localhost:5000/login/add', profile)
        
        if (res.data.slice(0,13) === "Existing User") {
            sessionStorage.setItem("currentUID", res.data.slice(15))
            navigate('/profile')
            return (<Navbar />).forceUpdateHandler
        }
        else {
            sessionStorage.setItem("currentUID", res.data)
            navigate('/profile')
            return (<Navbar />).forceUpdateHandler
        }
        console.log(sessionStorage.getItem("currentUID"))
        
    };

    const handleFailure = (response) => {
        alert("Login Failed :(");
        console.log(response);
    }
    
    return (
        <div>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={handleFailure}
            />
        </div>
    )
}



