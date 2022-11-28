import React, { Component} from 'react';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import axios from 'axios'

export default function Login() {
    
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

        console.log(user._id)
        const res = await axios.post('http://localhost:5000/login/add', user)
        
        sessionStorage.setItem("currentUID", res.data)


        console.log(sessionStorage.getItem("currentUID"));
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



