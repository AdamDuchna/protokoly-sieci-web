import { Formik,Field,Form } from "formik"
import React, { useState,useEffect} from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostCreationForm.css"
import {useHistory} from "react-router-dom";
import { addPost,mqttAddPost } from "../../ducks/posts/operations";
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';
import { v4 as uuidv4 } from 'uuid';

const PostCreationForm= ({login,addPost}) => {    
    const record = {topic:"default",qos: 0,};
    const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
    const publish = (payload) => {mqttPublish({...record,...payload})};

    useEffect(()=>{connect()},[])

    /*MQTT*/

    const history = useHistory()
    const [postStatus,setPostStatus] = useState('')
    const handleSubmit=(values)=>{
        if('_id' in login){
            addPost(values)
            publish({"topic":"posts/add","payload":JSON.stringify({...values,"creationDate": Date(),"_id": uuidv4()})})
            history.push('/')

             
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