import { Component} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import axios from 'axios'

export default class Login extends Component{
    constructor(props) {
        super(props); 

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
    }
    
    handleLogout = () => {
        googleLogout();
    }

    handleLogin = async (response) => {
        console.log(response.credential);
        var decoded = jwt_decode(response.credential);
        console.log(decoded);
        
        const user = {
            name: decoded.name,
            email: decoded.email, 
            img: decoded.img
        }

        axios.post('http://localhost:5000/login/add', user).then(res => console.log(res.data));

    };

    handleFailure = (response) => {
        alert("Login Failed :(");
        console.log(response);
    }
    
    render() {
        return (
            <div>
                <GoogleLogin
                onSuccess={this.handleLogin}
                onError={this.handleFailure}
                />
            </div>
        )
    }
}


