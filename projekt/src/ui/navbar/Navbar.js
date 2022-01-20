import React from 'react'
import { Link } from 'react-router-dom';
import '../../styling/navbar/Navbar.css'
const Navbar = () => {
    return (
        <div>
            <nav className='navbar'>
                <Link to='/' style={{ textDecoration: 'none', color: "black" }}><div className='logo'>elektroda.pl</div></Link>
                <Link to='/posts' style={{ textDecoration: 'none', color: "black" }}><div>Forum</div></Link>
                <Link to='/profile' style={{ textDecoration: 'none', color: "black" }}><div>Twój profil</div></Link>
                <div className='login-register-box'>
                <Link to='/login' style={{ textDecoration: 'none', color: "black" }}><div className='login'>Login</div></Link>
                <Link to='/register' style={{ textDecoration: 'none', color: "black" }}><div className='register'>Register</div></Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;