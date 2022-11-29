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


        const user = {
            name: decoded.name,
            email: decoded.email
        }

        const res = await axios.post('http://localhost:5000/login/add', user)
        
        if (res.data === "Existing User") {
            console.log("YUP")
            navigate('/profile')
        }
        else {
            sessionStorage.setItem("currentUID", res.data)
        }
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



