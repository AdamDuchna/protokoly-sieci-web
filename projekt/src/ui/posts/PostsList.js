import { useEffect,useState} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getPosts } from "../../ducks/posts/operations";
import { getPostsList } from "../../ducks/posts/selectors";

const PostsList = ({posts,getPosts}) => {
    useEffect(() => {
        if(posts.length === 0){getPosts()}
    },[posts])

    return (
    <div className="post-list">
        <Link to={`/posts/add`} style={{ textDecoration: 'none', color: "black" }}><div key="add" className="post-add">Create a new post</div></Link>
        {posts && posts.map(post => (<div key={post._id}><Link to={`/posts/${post._id}`} 
        style={{ textDecoration: 'none', color: "black" }}>
        <div>{post.title}</div>
        <div>{new Date(post.creationDate).toLocaleString()}</div></Link></div>))}
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