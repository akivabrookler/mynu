import React from 'react';
import {Link} from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();

    const Logout = () => {
        sessionStorage.removeItem("currentUID");
        googleLogout();
        console.log("Logged out")
        navigate('/login')
    }
    
    const forceUpdateHandler = () => {
        this.forceUpdate();
    }
    
    return(
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <div className='d-flex flex-row'>
                <div className='d-flex-col w-3 p-3 pt-3 pb-2 align-content-center align-baseline'>
                    <Link to="/" className='navbar-brand fw-bold'>Mynu</Link>
                </div>
                <div className='d-flex-col w-3 p-2 pt-3 align-content-center align-baseline'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to="/menu" className='nav-link'>Menu Items</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/profile" className='nav-link'>Profile</Link>
                        </li>
                        {
                            sessionStorage.getItem("currentUID") ? (
                                <li className='navbar-item'>
                                    <Link className='nav-link' onClick={Logout} to="/">Logout</Link>
                                </li>
                            ) :  (
                                <li className='navbar-item'>
                                    <Link to="/login" className='nav-link'>Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            

        </nav>
    );
}
