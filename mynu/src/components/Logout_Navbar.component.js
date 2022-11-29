import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function Logout() {
    sessionStorage.removeItem("currentUID");
    googleLogout();
    console.log("Logged out")
}

export default class Navbar extends Component{
    render(){
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className='navbar-brand'>Mynu</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to="/menu" className='nav-link'>Menu Items</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/profile" className='nav-link'>Profile</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/friends" className='nav-link'>Friends</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/createProfile" className='nav-link'>Create Profile</Link>
                        </li>
                        <li className='navbar-item'>
                          <button className='logout' onClick={Logout}>Logout</button>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}