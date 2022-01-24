import { useEffect,useState} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getPosts,mqttAddPost,mqttDelPost,mqttEditPost } from "../../ducks/posts/operations";
import { getPostsList } from "../../ducks/posts/selectors";
import "../../styling/posts/PostLists.css";
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttSub} from '../../mqtt/mqtt.js';

const PostsList = ({posts,getPosts,login,mqttAddPost,mqttDelPost,mqttEditPost}) => {
    const [shownPosts,setShownPosts] = useState(undefined)
    const [calls,setCalls] = useState(0)

    const [connStatus,setConnStatus] = useState(connectStatus)
    /*MQTT*/

      useEffect(() => {
        if (client) {
          client.on('connect', () => {
            setConnStatus('Connected');
          });
          client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
          });
          client.on('reconnect', () => {
            setConnStatus('Reconnecting');
          });
          client.on('message', (topic, message) => {
              switch (topic){
                    case "posts/edit":
                        const postEdited = JSON.parse(message)
                        mqttEditPost(postEdited)
                        break;
                    case "posts/delete":
                        const postDelete = message.toString()
                        mqttDelPost(postDelete)
                        break;
                    case "posts/add":
                        const postAdd = JSON.parse(message)
                        mqttAddPost(postAdd)
                        break;
                    default:
                        break;
              }
          });
        }
      }, [client]);
    
    const record = {topic:"default",qos: 1,};
    const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
    const subscribe = (topic)=>{mqttSub({...record,"topic":topic})};
    const disconnect = () => {mqttDisconnect()};


    /*MQTT*/
    
    useEffect(() => {
        if(calls<2){
        getPosts()
        setCalls(calls+1)
        }
    },[posts,getPosts,calls])

    useEffect(()=>{disconnect();connect()},[calls])
    useEffect(()=>{
    if(connStatus==="Connected"){
    subscribe("posts/edit");
    subscribe("posts/delete");
    subscribe("posts/add");}
    },[connStatus])

    useEffect(() => {
        setShownPosts(posts)
    },[posts])
    const handleSearch=(text)=>{
        if(text.length !== 0 ){ 
            const filteredPosts = posts.slice(0).filter(post=> post.title.toLowerCase().search(text.toLowerCase())!==-1)
            setShownPosts(filteredPosts)
        }
        else{setShownPosts(posts)}
    }

    return (
    <div className="post-menu">
        <input onChange={e=>handleSearch(e.target.value)} placeholder="Search for posts"></input>
        <Link onClick={()=>disconnect()} to={`/posts/add`} className="post-add" style={{ textDecoration: 'none', color: "black" }}>
        <div key="add" className="post-add">Create post</div></Link>
        <div className="post-list">
            <div className="posts">Posts</div>
            {shownPosts && shownPosts.map(post => (<div className="post" key={post._id}><Link to={`/posts/${post._id}`} 
            style={{ textDecoration: 'none', color: "black" }}>
            <div>{post.title}</div>
            <div>{new Date(post.creationDate).toLocaleString()}</div></Link></div>))}
        </div>
    </div>)
};
const mapStateToProps = (state) =>{
    return {
        posts: getPostsList(state),
        login: state.login
    }
}

const mapDispatchToProps = {
    getPosts,
    mqttAddPost,
    mqttDelPost,
    mqttEditPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);