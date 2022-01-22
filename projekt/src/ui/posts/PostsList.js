import { useEffect,useState} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getPosts } from "../../ducks/posts/operations";
import { getPostsList } from "../../ducks/posts/selectors";
import "../../styling/posts/PostLists.css"

const PostsList = ({posts,getPosts}) => {
    const [shownPosts,setShownPosts] = useState(undefined)
    useEffect(() => {
        if(posts.length === 0){getPosts()}
    },[posts])

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
        <Link to={`/posts/add`} className="post-add" style={{ textDecoration: 'none', color: "black" }}>
        <div key="add" className="post-add">Create post</div></Link>
        <div className="post-list">
            {shownPosts && shownPosts.map(post => (<div className="post" key={post._id}><Link to={`/posts/${post._id}`} 
            style={{ textDecoration: 'none', color: "black" }}>
            <div>{post.title}</div>
            <div>{new Date(post.creationDate).toLocaleString()}</div></Link></div>))}
        </div>
    </div>)
};
const mapStateToProps = (state) =>{
    return {
        posts: getPostsList(state)
    }
}

const mapDispatchToProps = {
    getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);