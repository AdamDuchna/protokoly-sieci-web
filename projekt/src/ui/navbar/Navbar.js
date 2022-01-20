import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../../styling/navbar/Navbar.css'
import Cookies from 'js-cookie';
import { setLoginAction } from '../../ducks/login/loginActions';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsersList } from '../../ducks/users/selectors';
import { getUsers } from '../../ducks/users/operations';

const Navbar = ({login,users,getUsers,setLoginAction}) => { 
    useEffect(() => {
        if(users.length === 0){getUsers()}
    },[users])

    useEffect(()=>{
        const logged = fetchLogin()
        if(logged){setLoginAction(logged)}
    })

    const fetchLogin=()=>{
        const cookieLogin = Cookies.get("login")
        const cookiePassword = Cookies.get("password")
        return users.find(user=>user.login === cookieLogin && user.password === cookiePassword )
    }

    const handleLogout=()=>{
        setLoginAction({})
        Cookies.remove("login")
        Cookies.remove("id")
    }
    return (
        <div>
            <nav className='navbar'>
                <Link to='/' style={{ textDecoration: 'none', color: "black" }}><div className='logo'>electrode.com</div></Link>
                { Object.keys(login).length === 0 ?
                <div className='login-register-box'>
                <Link to='/login' style={{ textDecoration: 'none', color: "black" }}><div className='login'>Login</div></Link>
                <Link to='/register' style={{ textDecoration: 'none', color: "black" }}><div className='register'>Register</div></Link>
                </div> 
                : 
                <div className='login-register-box'>
                <Link to='/profile' style={{ textDecoration: 'none', color: "black" }}><div className='login'>{login.login}</div></Link>
                <Link to='/login' style={{ textDecoration: 'none', color: "black" }}><div className='register' onClick={handleLogout}>Logout</div></Link>
                </div> 
                }
            </nav>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { 
        login: state.login,
        users: getUsersList(state) 
    }
}
const mapDispatchToProps ={
    setLoginAction,
    getUsers
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));
