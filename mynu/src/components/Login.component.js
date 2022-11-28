import { Component} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState } from 'react';

export default function Login() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    )
    
    const handleLogout = () => {
        localStorage.removeItem('loginData')
        setLoginData(null)
        googleLogout();
    }

    const handleLogin = async (response) => {
        console.log(response.credential);
        var decoded = jwt_decode(response.credential);
        console.log(decoded);

    };

    const handleFailure = (response) => {
        alert("Login Failed :(");
        console.log(response);
    }
    
    return (
        <div>
            {
                loginData ? (
                    <div>
                        <h3>You logged in as {loginData.email}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <GoogleLogin
                    onSuccess={handleLogin}
                    onError={handleFailure}
                    />
                )
            }
        </div>
    )
}



