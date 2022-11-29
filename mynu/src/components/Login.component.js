import React, { Component} from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { Navigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
    }

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
        }
        else {
            sessionStorage.setItem("currentUID", res.data)
            navigate('/profile')
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



