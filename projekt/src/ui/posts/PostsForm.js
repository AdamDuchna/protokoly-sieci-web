import { Formik,Field,Form } from "formik"
import React, { useState,useEffect} from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostCreationForm.css"
import {useHistory} from "react-router-dom";
import { addPost,getPosts } from "../../ducks/posts/operations";
import {mqttConnect,mqttDisconnect,mqttPublish} from '../../mqtt/mqtt.js';
import { getPostsList } from "../../ducks/posts/selectors";

const PostCreationForm= ({login,posts,addPost,getPosts}) => {    
    const record = {topic:"default",qos: 1,};
    const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
    const publish = (payload) => {mqttPublish({...record,...payload})};
    const disconnect = () => {mqttDisconnect()};

    useEffect(()=>{disconnect();connect()},[])

    /*MQTT*/

    const history = useHistory()
    const [postStatus,setPostStatus] = useState('')
    const handleSubmit=(values)=>{
        if('_id' in login){
            addPost(values)
            publish({"topic":"posts/add","payload":JSON.stringify({...values,"creationDate": Date(),"_id": "p"+(parseInt(posts.slice(-1)[0]._id.slice(1))+1).toString(),})})
            history.push('/')      
        }
        else{setPostStatus("Login to post")}
    }
    const [calls,setCalls] = useState(0)

    useEffect(() => {
        if(calls<2){
        if(posts.length === 0)getPosts()
        setCalls(calls+1)
        }
    },[posts,getPosts,calls])
    return (
        <div className="post-creationForm">
            <Formik
                initialValues={{
                    _id: "p"+(parseInt(posts.slice(-1)[0]._id.slice(1))+1).toString(),
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
        posts: getPostsList(state),
        login: state.login,
    }
}
const mapDispatchToProps ={
    addPost,
    getPosts
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostCreationForm));