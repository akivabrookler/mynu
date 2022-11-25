import {Component} from 'react';
import {Link} from 'react-router-dom';

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
                            <Link to="/item" className='nav-link'>Menu Item</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/profile" className='nav-link'>Profile</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/friends" className='nav-link'>Friends</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}