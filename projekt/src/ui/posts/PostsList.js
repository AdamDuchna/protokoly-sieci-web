import { useEffect,useState} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getPosts } from "../../ducks/posts/operations";
import { getPostsList } from "../../ducks/posts/selectors";
import "../../styling/posts/PostLists.css"

const PostsList = ({posts,getPosts}) => {
    useEffect(() => {
        if(posts.length === 0){getPosts()}
    },[posts])

    return (
    <div className="post-menu">
        <input placeholder="Search for posts"></input>
        <Link to={`/posts/add`} className="post-add" style={{ textDecoration: 'none', color: "black" }}>
        <div key="add" className="post-add">Create post</div></Link>
        <div className="post-list">
            {posts && posts.map(post => (<div className="post" key={post._id}><Link to={`/posts/${post._id}`} 
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