import { Formik,Field,Form } from "formik"
import React, { useEffect,useState} from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styling/login/UserLoginForm.css"
import sha1 from "crypto-js/sha1";
import { getUsersList } from "../../ducks/users/selectors";
import { getUsers,addUser } from "../../ducks/users/operations";
import {useHistory} from "react-router-dom";

const UserRegisterForm= ({users,getUsers,addUser}) => {
    const history = useHistory()
    const [calls,setCalls] = useState(0)
    useEffect(() => {
        if(calls<2){
            if(users.length === 0){getUsers()}
            setCalls(calls+1)
        }
    },[users,getUsers,calls])
    const handleSubmit=(values)=>{
        history.push("/")
        const encrypted = sha1(values.password).toString()
        addUser({...values,password:encrypted})
    }
    return (
        <div className="user-loginForm">
            <Formik
                initialValues={{
                    _id: "u"+(parseInt(users.slice(-1)[0]._id.slice(1))+1).toString(),
                    firstName:"",
                    lastName:"",
                    login:"",
                    password:"",
                    role: "user"

                }}
                onSubmit={(values) => handleSubmit(values)}>
                <Form>
                    <label name="firstName">Name</label>
                    <Field name="firstName"/>

                    <label name="lastName">Surname</label>
                    <Field name="lastName"/>

                    <label name="login">Username</label>
                    <Field name="login"/>

                    <label name="password"  >Password</label>
                    <Field  type="password" name="password"/>
                    
                    <div>
                        <button type="submit">Register</button>
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
    addUser
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserRegisterForm));