import { connect } from "react-redux";
import { getPostsList } from "../../ducks/posts/selectors";
import { getPosts,deletePost,editPost } from "../../ducks/posts/operations";
import { withRouter } from "react-router-dom";
import "../../styling/posts/PostDetail.css"
import {Link} from "react-router-dom";
import { useEffect,useState } from "react";
import { getUsersList } from "../../ducks/users/selectors";
import { getUsers,deleteUser } from "../../ducks/users/operations";
import { addComment,getComments,deleteComment,editComment } from "../../ducks/comments/operations";
import { getCommentList } from "../../ducks/comments/selectors";
import { addLikes,getLikes,editLikes,deleteLikes } from "../../ducks/likes/operations";
import { getLikesList } from "../../ducks/likes/selectors";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const PostDetail= ({post,users,getPosts,getUsers,login,addComment,deletePost,deleteLikes
    ,getComments,comments,likes,addLikes,getLikes,editLikes,deleteComment,deleteUser,editComment,editPost } ,props) => {
    const [author,setAuthor] = useState(undefined)
    const [comment,setComment] = useState("")
    const [likeStatus,setLikeStatus] = useState("")
    const [shownComments,setShownComments] = useState(comments)
    const [editComm,setEditComm] = useState(undefined)
    const [editedComm,setEditedComm] = useState(undefined)
    const [editPostId,setEditPostId] = useState(undefined)
    const [editedTitle,setEditedTitle] = useState(undefined)
    const [editedText,setEditedText] = useState(undefined)
    const [calls,setCalls] = useState(0)
    const history = useHistory()

    useEffect(() => {
        if(calls<2){
            if(!post){getPosts()}
            if(users.length === 0){getUsers()}
            if(comments.length === 0){getComments()}
            if(!likes){getLikes()}
            setCalls(calls+1)
        }
    },[post,likes,comments,users,getPosts,getUsers,getComments,getLikes,calls])

    useEffect(()=>{
        if(users && post)setAuthor(users.find(user=>user._id === post.author))
    },[users,post])

    useEffect(()=>{
        const mappedComments = comments.slice(0).reduce((acc,comm)=>{
        return [...acc,{...comm,"author":users.find(u=>u._id === comm.author)}]
        },[])
        setShownComments(mappedComments)
    },[users,comments])

    const handleDelete = (id)=>{
        deleteComment(id)
    }
    const handleDeletePost = (PostId,LikesId) => {
        history.push("/")
        deletePost(PostId)
        deleteLikes(LikesId)
    }

    const handleSubmit = (comm)=>{
        addComment(comm)
        setComment("")
    }
    const handleBan = (id)=>{
        deleteUser(id)
    }
    const handleEditComm = (comm) => {
        setEditComm(comm._id)
        setEditedComm(comm.text)
    }
    const handleEditPost = (post) => {
        setEditPostId(post._id)
        setEditedTitle(post.title)
        setEditedText(post.text)
    }
    const submitEditPost = (post) => {
        setEditPostId(undefined)
        editPost({...post,"text":editedText,"title":editedTitle})
    }
    const submitEditComm = (comment) => {
        setEditComm(undefined)
        editComment({...comment,"text":editedComm})
    }
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
                            break;
                        }
                        else if(likes.usersDownvotes.includes(login._id)){
                            const unvote ={...likes,"count": likes.count+2, "usersDownvotes": [ ...likes.usersDownvotes.filter(user=>user !== login._id)],"usersUpvotes": [...likes.usersUpvotes,login._id]}
                            editLikes(unvote)
                            break;
                        }
                        else{
                            const unvote ={...likes,"count": likes.count+1,
                            "usersUpvotes": [...likes.usersUpvotes,login._id]}
                            editLikes(unvote)
                            break;
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
                            const unvote ={...likes,"count": likes.count+1,
                            "usersDownvotes": [ ...likes.usersDownvotes.filter(user=>user !== login._id)]}
                            editLikes(unvote)
                            break;
                        }
                        if(likes.usersUpvotes.includes(login._id)){
                            const unvote ={...likes,"count": likes.count-2,
                            "usersUpvotes": [...likes.usersUpvotes.filter(user=>user !== login._id)],
                            "usersDownvotes": [...likes.usersDownvotes,login._id]}
                            editLikes(unvote)
                            break;
                        }
                        else{
                            const unvote ={...likes,"count": likes.count-1,
                            "usersDownvotes": [...likes.usersDownvotes,login._id]}
                            editLikes(unvote)
                            break;
                        }
                    }
                    break;
            default:
            }
        }
        else{setLikeStatus("Login to vote")}
    }
    return (
        <div className="post-window">
            {post ? 
            <div className="post-content">
                <div className="post-title-date">
                    {editPostId !== post._id ? <div>{post.title}</div> : <input className="post-edit" value={editedTitle} onChange={(e)=>{setEditedTitle(e.target.value)}}></input>}
                    <div>{new Date(post.creationDate).toLocaleString()}</div>
                </div>
                {editPostId !== post._id ? <div className="post-text">{post.text}</div> : <textarea rows="6" className="post-edit"  value={editedText} onChange={(e)=>{setEditedText(e.target.value)}}></textarea>}
                <div className="post-author-vote">
                    <div className="post-vote">
                        <div onClick={()=>handleVote("upvote")}><i className="fa fa-angle-up"></i></div>
                        <div>{likes ? likes.count : <></>}</div>
                        <div onClick={()=>handleVote("downvote")}><i className="fa fa-angle-down"></i></div>
                        <div className="login-status">{likeStatus}</div>
                    </div>
                    <div className="post-author">{author ? <Link to={`/profile/${author._id}`} 
                    style={{ textDecoration: 'none', color: "black" }}><div>{author.login}</div></Link> : <div>[removed]</div>}</div>
                </div>
            </div>: 
            <div>Loading</div>}
            {
                post && post.author && login._id !== post.author && login.role === "admin" ? 
                <div className="admin-panel">
                    <div onClick={()=>handleDeletePost(post._id,likes._id)}><i className="fa fa-trash"></i></div>
                    <div onClick={()=>handleBan(post.author)}><i className="fa fa-ban"></i></div>
                </div> : <></>
            }

            {
            post && post.author && login._id === post.author? 
                <div className="author-panel">
                    <div onClick={()=>handleDeletePost(post._id,likes._id)}><i className="fa fa-trash"></i></div>
                    <div onClick={()=>{handleEditPost(post)}}><i className="fa fa-pencil"></i></div>
                    {editPostId === post._id ? <div onClick={()=>submitEditPost(post)}><i className="fa fa-check"></i> </div> : <></>}
                </div> : <></>
            }

            <div className="post-comment">
                <input type="text" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Write a comment"></input>
                <button onClick={()=>{ handleSubmit({"text":comment,"author":login._id,"post":post._id})}}>Send</button>
            </div>
            <div className="post-comments">
                <div>Comments</div>
                {shownComments && shownComments.map(comment => (<div className="comment" key={comment._id}>
                    <div className="comment-edit">
                    {editComm !== comment._id ? <div className="comment-message">{comment.text}</div> : <input className="comment-message" value={editedComm} onChange={(e)=>{setEditedComm(e.target.value)}}></input>}
                    {
                        post && comment && comment.author && login._id !== post.author && login.role === "admin" ? 
                        <div className="admin-comment-panel">
                            {editComm === comment._id ? <div onClick={()=>submitEditComm(comment)}><i className="fa fa-check"></i> </div> : <></>}
                            <div onClick={()=>handleDelete(comment._id)}><i className="fa fa-trash"></i></div>
                            {comment.author._id === login._id ? 
                            <div onClick={()=>handleEditComm(comment)}><i className="fa fa-pencil"></i></div> : 
                            <div onClick={()=>handleBan(comment.author._id)}><i className="fa fa-ban"></i></div>}
                        </div> : <></>
                    }
                    {
                    post && comment && comment.author && login._id === post.author && (comment.author.role !== "admin" || login.role === "admin") ? 
                        <div className="author-comment-panel">
                            {editComm === comment._id ? <div onClick={()=>submitEditComm(comment)}><i className="fa fa-check"></i> </div> : <></>}
                            <div onClick={()=>handleDelete(comment._id)}><i className="fa fa-trash"></i></div>
                            {login.role === "admin" && comment.author._id !== login._id ? <div onClick={()=>handleBan(comment.author._id)}><i className="fa fa-ban"></i></div>
                            : <></>}
                            {login._id === comment.author._id ? <div onClick={()=>handleEditComm(comment)}><i className="fa fa-pencil"></i></div>
                            : <></>}
                        </div> : <></>
                    }

                    {
                     post && comment && comment.author && login._id !== post.author && comment.author._id === login._id  && login.role !== "admin"  ? 
                        <div className="user-comment-panel">
                            {editComm === comment._id ? <div onClick={()=>submitEditComm(comment)}><i className="fa fa-check"></i> </div> : <></>}
                            <div onClick={()=>handleDelete(comment._id)}><i className="fa fa-trash"></i></div>
                            <div onClick={()=>handleEditComm(comment)}><i className="fa fa-pencil"></i></div>
                        </div> : <></>
                    }
                    </div>
                    <div className="comment-info">
                        {comment.author ? <Link to={`/profile/${comment.author._id}`} 
                        style={{ textDecoration: 'none', color: "black" }}><div>{comment.author.login}</div></Link> : <div>[removed]</div> }
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
    editLikes,
    deleteComment,
    deletePost,
    deleteLikes,
    deleteUser,
    editComment,
    editPost
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));