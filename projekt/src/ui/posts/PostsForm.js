import { Formik,Field,Form } from "formik"
import React, { useState} from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostCreationForm.css"
import {useHistory} from "react-router-dom";
import { addPost } from "../../ducks/posts/operations";

const PostCreationForm= ({login,addPost}) => {
    const history = useHistory()
    const [postStatus,setPostStatus] = useState('')
    const handleSubmit=(values)=>{
        if('_id' in login){
            history.push('/') 
            addPost(values)
        }
        else{setPostStatus("Login to post")}
    }
    return (
        <div className="post-creationForm">
            <Formik
                initialValues={{
                    title:"",
                    text:"",
                    responses: 0 ,
                    author: '_id' in login ? login._id : ''

                }}
                onSubmit={(values) => handleSubmit(values)}>
                <Form>
                    <label name="title">Title</label>
                    <Field name="title"/>

                    <label name="text">Text</label>
                    <Field as="textarea" name="text"/>

                    <div className='submit-box'>
                        <button type="submit">Submit</button>
                        <div>{postStatus}</div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { 
        login: state.login
    }
}
const mapDispatchToProps ={
    addPost
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostCreationForm));