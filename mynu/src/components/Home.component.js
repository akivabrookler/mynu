import React, { Component }  from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {
    render(){
        return (
            <div class="d-flex align-items-center flex-column">
                <h class="display-4 text-center font-weight-bold p-3">Mynu</h>
                <h2 class="text-center fw-italic fw-light p-2">My Menu, Built Just For You</h2>
                <h5 className='p-2 pb-3'> <Link class="text-center text-info text-decoration-none"  to="/menu">Click to start building your menu!</Link></h5>
                <h5 class = "border border-info p-2" > <Link class="text-center text-info text-decoration-none"  to="/login">Login</Link></h5>
            </div>
        );
    }
}