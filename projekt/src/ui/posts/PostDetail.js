import { connect } from "react-redux";
import { getPostsList } from "../../ducks/posts/selectors";
import { getPosts } from "../../ducks/posts/operations";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostDetail.css"
import {Link} from "react-router-dom";
import { useEffect,useState } from "react";
import { getUsersList } from "../../ducks/users/selectors";
import { getUsers } from "../../ducks/users/operations";
import { addComment,getComments } from "../../ducks/comments/operations";
import { getCommentList } from "../../ducks/comments/selectors";
import { addLikes,getLikes,editLikes } from "../../ducks/likes/operations";
import { getLikesList } from "../../ducks/likes/selectors";
const PostDetail= ({post,users,getPosts,getUsers,login,addComment,getComments,comments,likes,addLikes,getLikes,editLikes} ,props) => {
    const [author,setAuthor] = useState(undefined)
    const [comment,setComment] = useState("")
    const [likeStatus,setLikeStatus] = useState("")
    useEffect(() => {
        if(!post){getPosts()}
        if(users.length === 0){getUsers()}
        if(comments.length === 0){getComments()}
        if(!likes){getLikes()}
    },[post,likes])
    useEffect(()=>{
        if(users && post)setAuthor(users.find(user=>user._id === post.author))
    },[users,post])

    const handleVote = (vote)=>{
        if( "_id" in login){
            switch(vote){
                case "upvote":
                    if(!likes){
                    const upvote={"count": 1,"post": post._id,"usersUpvotes": [login._id],"usersDownvotes": []}
                    addLikes(upvote)
                    }
                    else{
                        if(likes.usersUpvotes.includes(login._id)){
                            const unvote ={...likes,"count": likes.count-1,
                            "usersUpvotes": [ ...likes.usersUpvotes.filter(user=>user !== login._id)]}
                            editLikes(unvote)
                        }
                        else{
                            const unvote ={...likes,"count": likes.count+1, "usersDownvotes": [ ...likes.usersDownvotes.filter(user=>user !== login._id)],"usersUpvotes": [...likes.usersUpvotes,login._id]}
                            editLikes(unvote)
                        }
                    }
                    break;
                case "downvote":
                    if(!likes){
                    const downvote={"count": -1,"post": post._id,"usersUpvotes": [],"usersDownvotes": [login._id]}
                    addLikes(downvote)
                    }
                    else{
                        if(likes.usersDownvotes.includes(login._id)){
                            const unvote ={...likes,"count": likes.count+1,"usersDownvotes": [ ...likes.usersDownvotes.filter(user=>user !== login._id)]}
                            editLikes(unvote)
                        }
                        else{
                            const unvote ={...likes,"count": likes.count-1,
                            "usersUpvotes": [...likes.usersUpvotes.filter(user=>user !== login._id)],
                            "usersDownvotes": [...likes.usersDownvotes,login._id]}
                            editLikes(unvote)
                        }
                    }
                    break;
            }
        }
        else{setLikeStatus("Login to vote")}
    }
    return (
        <div className="post-window">
            {post ? 
            <div className="post-content">
                <div className="post-title-date">
                    <div>{post.title}</div>
                    <div>{new Date(post.creationDate).toLocaleString()}</div>
                </div>
                <div>{post.text}</div>
                <div className="post-author-vote">
                    <div className="post-vote">
                        <div onClick={()=>handleVote("upvote")}><i className="fa fa-angle-up"></i></div>
                        <div>{likes ? likes.count : <></>}</div>
                        <div onClick={()=>handleVote("downvote")}><i className="fa fa-angle-down"></i></div>
                        <div className="login-status">{likeStatus}</div>
                    </div>
                    <div className="post-author">{author ? author.login : <div>[removed]</div>}</div>
                </div>
            </div>: 
            <div>Loading</div>}
            {
                post && login._id !== post.author && login.role === "admin" ? 
                <div className="admin-panel">
                    <div><i className="fa fa-trash"></i></div>
                    <div><i className="fa fa-ban"></i></div>
                </div> : <></>
            }

            {
            post && login._id === post.author? 
                <div className="author-panel">
                    <div><i className="fa fa-trash"></i></div>
                    <div><i className="fa fa-pencil"></i></div>
                    {login.role === "admin" ? <div><i className="fa fa-ban"></i></div>
                     : <></>}
                </div> : <></>
            }

            <div className="post-comment">
                <input type="text" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Write a comment"></input>
                <button onClick={()=>{
                    addComment({"text":comment,"author":login._id,"post":post._id})
                    setComment("")
                    }}>Send</button>
            </div>
            <div className="post-comments">
                {comments && comments.map(comment => (<div className="comment" key={comment._id}>
                    <div className="comment-message">{comment.text}</div>
                    <div className="comment-info">
                        <div>{comment.author}</div>
                        <div>{new Date(comment.creationDate).toLocaleString()}</div>
                    </div>
                </div>))}
            </div>
        </div>
    )
};
const mapStateToProps = (state,ownProps) => {
    return {
        post: getPostsList(state).find(post => post._id === ownProps.match.params.id),
        users: getUsersList(state),
        login: state.login,
        comments: getCommentList(state).filter(comment => comment.post === ownProps.match.params.id),
        likes: getLikesList(state).find(like => like.post === ownProps.match.params.id)

    };
}

const mapDispatchToProps = {
    getPosts,
    getUsers,
    addComment,
    getComments,
    addLikes,
    getLikes,
    editLikes
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));