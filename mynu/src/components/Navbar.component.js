import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';


export default class Navbar extends Component{
    Logout() {
        sessionStorage.removeItem("currentUID");
        googleLogout();
        console.log("Logged out")
    }
    
    forceUpdateHandler() {
        this.forceUpdate();
    }
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
                            <Link to="/createProfile" className='nav-link'>Create Profile</Link>
                        </li>
                        {/* <li className='navbar-item'>
                            <Link to="/login" className='nav-link'>Login</Link>
                        </li> */}
                        {
                            sessionStorage.getItem("currentUID") ? (
                                <li className='navbar-item'>
                                    <button className='logout' onClick={this.Logout}>Logout</button>
                                </li>
                            ) :  (
                                <li className='navbar-item'>
                                    <Link to="/login" className='nav-link'>Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>

            </nav>
        );
    }
}