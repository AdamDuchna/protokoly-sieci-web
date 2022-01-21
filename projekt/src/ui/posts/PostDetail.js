import { connect } from "react-redux";
import { getPostsList } from "../../ducks/posts/selectors";
import { getPosts } from "../../ducks/posts/operations";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostDetail.css"
import {Link} from "react-router-dom";
import { useEffect,useState } from "react";
import { getUsersList } from "../../ducks/users/selectors";
import { getUsers } from "../../ducks/users/operations";
const PostDetail= ({post,users,getPosts,getUsers} ,props) => {
    const [author,setAuthor] = useState(undefined)
    useEffect(() => {
        if(!post){getPosts()}
    },[post])
    useEffect(()=>{
        if(users && post)setAuthor(users.find(user=>user._id === post.author))
    },[users,post])
    return (
        <div className="post-window">
            {post ? 
            <div className="post-content">
                <div className="post-title-date">
                    <div>{post.title}</div>
                    <div>{new Date(post.creationDate).toLocaleString()}</div>
                </div>
                <div>{post.text}</div>
                <div>{author ? author.login : <></>}</div>
            </div>: 
            <div>Loading</div>}
        </div>
    )
};
const mapStateToProps = (state,ownProps) => {
    return {
        post: getPostsList(state).find(post => post._id === ownProps.match.params.id),
        users: getUsersList(state)

    };
}

const mapDispatchToProps = {
    getPosts,
    getUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));