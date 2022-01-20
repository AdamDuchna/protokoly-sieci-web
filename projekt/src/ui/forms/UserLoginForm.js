import { Formik,Field,Form } from 'formik'
import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../../styling/login/UserLoginForm.css'

const UserLoginForm= () => {

    return (
        <div className='user-loginForm'>
            <Formik>
                <Form>
                    <label name="firstName">Username</label>
                    <Field name="login"/>

                    <label name="lastName">Password</label>
                    <Field name="password"/>
                    
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
const mapStateToProps = (state) => {}
const mapDispatchToProps ={

};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserLoginForm));