import { Component} from 'react';
import { Link } from "react-router-dom";


export default class Home extends Component {
    render(){
        return (
            <div class="d-flex align-items-center flex-column">
                <h1 class="display-4 text-center font-weight-bold">Mynu</h1>
                <h1 class="text-center font-italic font-weight-light">My Menu, Built Just For You</h1>
                <h5 > <Link class="text-center font-weight-light text-info text-decoration-none"  to="/menu">Click to start building your menu!</Link></h5>
            </div>
        );
    }
}