import { Formik,Field,Form } from 'formik'
import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../../styling/login/UserLoginForm.css'
import sha1 from 'crypto-js/sha1';
import { getUsersList } from '../../ducks/users/selectors';
import { getUsers } from '../../ducks/users/operations';
import Cookies from 'js-cookie';
import { setLoginAction } from '../../ducks/login/loginActions';
import {useHistory} from "react-router-dom";

const UserLoginForm= ({users,getUsers,setLoginAction}) => {
    const [loginStatus,setLoginStatus] = useState('')
    const history = useHistory()
    const [calls,setCalls] = useState(0)
    useEffect(() => {
        if(calls<2){
            if(users.length === 0){getUsers()}
            setCalls(calls+1)
        }
    },[users,getUsers,calls])
    const handleSubmit=(values)=>{
        const {login,password} = values
        const encrypted = sha1(password).toString()
        const logged = users.find(user=>user.login === login && user.password === encrypted )
        if(logged){
            history.push("/")
            Cookies.set("login",logged.login, { expires: 1 })
            Cookies.set("password",logged.password , { expires: 1 })
            setLoginStatus("")
            setLoginAction(logged)   
        }
        else{setLoginStatus("Wrong password/login")}
    }

    return (
        <div className='user-loginForm'>
            <Formik
                initialValues={{
                login:'',
                password:''
                }}
                onSubmit={(values) => handleSubmit(values)}>
                <Form>
                    <label name="login">Username</label>
                    <Field name="login"/>

                    <label name="password" >Password</label>
                    <Field type="password" name="password"/>
                    
                    <div className='login-box'>
                        <button type="submit">Login</button>
                        <div>{loginStatus}</div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { users: getUsersList(state)}
}
const mapDispatchToProps ={
    getUsers,
    setLoginAction
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserLoginForm));