import { useState } from "react"
import { Link } from "react-router-dom"
import './Post.css'
import { Trash, ThumbsDown, ThumbsUp } from "lucide-react"
import { motion } from 'framer-motion'
import { apiLink } from "../apiRequests"



export default function Post({ index, post, LocalUser, userprofile }) {

        async function handlePostLike({ post, LocalUser, setPost }) {
            try {
                const response = await fetch(`${apiLink}/api/post/like`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ post: post, userid: LocalUser._id })
                });

                if (response.ok) {
                    const updatedPost = await response.json();
                    setPost(updatedPost); 
                } else {
                    console.log("Error liking the post");
                }
            } catch (err) {
                console.log(err);
            }
        }

        async function handlePostDisslike({ post, LocalUser, setPost }) {
            
            try {
                const response = await fetch(`${apiLink}/api/post/disslike`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ post: post, userid: LocalUser._id })
                });

                if (response.ok) {
                    const updatedPost = await response.json();
                    setPost(updatedPost); 
                } else {
                    console.log("Error dissliking the post");
                }
            } catch (err) {
                console.log(err);
            }
        }

        async function handlePostCommentAdd({ post, LocalUser, setPost }){
         
            if (Comment !== "" && LocalUser) {
                try {
                    const response = await fetch(`${apiLink}/api/post/comment/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ post, LocalUser, Comment })
                    });
                    setComment('')
                    if (response.ok) {
                        const data = await response.json(); 
                        setUpdatedPost(data.updatedpost)
                    } else {
                        const errorData = await response.json();
                        throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            

        }

        async function handlePostCommentDelete({ post, comment, LocalUser, setPost }){
            if (LocalUser._id == comment.userId) {
                try {
                    const response = await fetch(`${apiLink}/api/post/comment/delete`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ post, comment, LocalUser, Comment })
                    });
                    if (response.ok) {
                        const data = await response.json(); 
                        setUpdatedPost(data.updatedPost)
                    } else {
                        const errorData = await response.json();
                        throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
                    }
                } catch (err) {
                    console.error(err);
                }
            } else (console.log(`${LocalUser._id} !== ${post.userid}`))
            

        }

      
        
        
        


    const [Settings, setSettings] = useState(0);
    const [updatedPost, setUpdatedPost] = useState(post);
    const [Comment, setComment] = useState("");
    const [HiddenComments, setHiddenComments] = useState(1);
    const isUserLoggedIn = LocalUser != null;

    const handleLike = () => {
        if (isUserLoggedIn) {
            handlePostLike({ post: updatedPost, LocalUser, setPost: setUpdatedPost });
        }
    };

    const handleDislike = () => {
        if (isUserLoggedIn) {
            handlePostDisslike({ post: updatedPost, LocalUser, setPost: setUpdatedPost });
        }
    };

    return (
        <>
                  <div className="Post" key={index}>
                <div className="InnerPost">
                    <div className="PostData">
                        <div style={{display:"flex",justifyContent:'center',alignItems:'center', gap:"10px"}}>
                            <img src={userprofile.profilepicture} className="profilepicture"></img>
                            <Link to={`/users/${post.userid}`} style={{textDecoration:"none"}}><p className="PostCreatorName">{post.username}</p></Link>
                        </div>
                        {isUserLoggedIn && LocalUser._id === "67c56609799c6ac2b965ebdd" ? (
                            <>  
                                <PostManip Settings={Settings} setSettings={setSettings} updatedPost={updatedPost} setUpdatedPost={{setUpdatedPost}}/>
                            </>
                        ) : (
                            isUserLoggedIn && LocalUser._id === post.userid && (
                                <PostManip Settings={Settings} setSettings={setSettings} updatedPost={updatedPost} setUpdatedPost={{setUpdatedPost}}/>
                            )
                        )}
                    </div>
                    <hr style={{ width: "100%", opacity:0.1 }} />
                    <div className="PostContent" >
                        {updatedPost.content != "-" && 
                        (updatedPost.content.split(" ").map((word,index)=>{
                            if(word.includes(".com")){
                                return(
                                    <a href={word}>{word.slice(12)}</a>
                                )
                            }else{
                                return(
                                    <span>{word} </span>
                                    )
                            }
                        }))
                        }
                    </div>
                    {updatedPost.imageurl && 
                     <div className="PostImageContainter">
                        <img src={updatedPost.imageurl} className="PostImage"></img>
                     </div>
                    }

                   
                    <br />
                    <span className="PostDate">{updatedPost.date}</span>

                    
                    <hr style={{ width: "100%", opacity:0.1 }} />

                    
                    <div className="PostRating">
                        <motion.button
                            whileTap={{scale:0.9}}
                            whileHover={{scale:1.1}}
                            className="PostRatingThumb"
                            style={{
                                backgroundColor: isUserLoggedIn && updatedPost.likes.includes(LocalUser._id) ? "var(--colorInteraction)" : "var(--colorNoInteraction)",
                            }}
                            onClick={()=>{handleLike(), (isUserLoggedIn && updatedPost.disslikes.includes(LocalUser._id) && handleDislike())}}  
                            disabled={!isUserLoggedIn} 
                        >
                            <ThumbsUp /> 
                            {updatedPost && updatedPost.likes.length}
                        </motion.button>
                        
                        <motion.button
                            whileTap={{scale:0.9}}
                            whileHover={{scale:1.1}}
                            className="PostRatingThumb"
                            style={{
                                backgroundColor: isUserLoggedIn && updatedPost.disslikes.includes(LocalUser._id) ? "var(--colorInteraction)" : "var(--colorNoInteraction)",
                            }}
                            onClick={()=>{handleDislike(), (isUserLoggedIn && updatedPost.likes.includes(LocalUser._id) && handleLike())}} 
                            disabled={!isUserLoggedIn} 
                        >
                            <ThumbsDown />
                            {updatedPost && updatedPost.disslikes.length}
                        </motion.button>
                        <br></br>

                        {updatedPost && (updatedPost.comments.length >= 1) ?
                        <span onClick={()=>{setHiddenComments(prev=>(prev == 1 ? 0 : 1))}}>Comments {updatedPost.comments.length}</span>
                        :
                        <span onClick={()=>{setHiddenComments(prev=>(prev == 1 ? 0 : 1))}}>No comments</span>}
                    </div>
                    

                            
                
                    
                    <motion.div initial={{height:"0px", overflow:"hidden"}} 
                        animate={!HiddenComments ? {height:'fit-content',overflowY:"auto",} : {height:"0px", overflowY:"hidden",padding:0}}
                        transition={{duration:0.5 , ease:"circOut"}}
                        className="CommentContainer">

                        <div className="CommentsPostMenu">
                            <input type="text" placeholder="Add a comment" value={Comment} onChange={(event)=>{setComment(event.target.value)}}></input>
                            <button onClick={()=>{handlePostCommentAdd({post: updatedPost, LocalUser, setPost: setUpdatedPost})}}>Post</button> 
                        </div>

                        <motion.div
                        className="Comments" 
                        style={updatedPost.comments.length == 0 && {padding:0, display:"none"}}
                        >
                            <div  className="CommentsBorder" >
                                {updatedPost && updatedPost.comments.toReversed().map((comment,index)=>{
                                    return(
                                        <>
                                            <div className="Comment">
                                                <div className="CommentData">
                                                    <img className="profilepicture" src={comment.userprofilepicture}></img>
                                                    <Link to={`users/${comment.userId}`} style={{textDecoration:"none"}}>
                                                    <p className="PostCreatorName" style={{}}>{comment.username} {comment.usersurename}</p>
                                                    </Link>
                                                </div>

                                                <div className="CommentContent">
                                                    {comment.comment}
                                                </div>

                                                {LocalUser && (LocalUser._id == updatedPost.userid || comment.userId === LocalUser._id) &&
                                            <div className="CommentManip">
                                                <button onClick={()=>{handlePostCommentDelete({post: updatedPost, comment: comment, LocalUser, setPost: setUpdatedPost})}}><Trash></Trash></button>
                                            </div>
                                                }
                                            
                                            </div>
                                            
                                        </>
                                    )
                                })}
                                </div>
                        </motion.div>
                    </motion.div>  

                </div>
            </div>
        </>
    );
}


export function PostManip({ Settings, setSettings, updatedPost, setUpdatedPost }) {

    async function handlePostDelete({ updatedPost, setUpdatedPost }) {
        try {
            const response = await fetch(`${apiLink}/api/post`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPost)
            });
            window.location.reload()
            if (response.ok) {
                setUpdatedPost(null);
            } else {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="PostManipulation">
            <motion.button
                onClick={() => { setSettings(prev => (prev === 1 ? 0 : 1)) }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                style={{color:"white"}}
            >
                ...
            </motion.button>

            <motion.div
                className="PostSettings"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                animate={Settings ? { padding: "20px 5px", borderWidth: "1px", opacity: 1 } : { height: 0, padding: "0px 5px", borderWidth: "0px", opacity: 1 ,}}
                transition={{ ease: "circInOut", duration: 0.25 }}
            >
                <motion.div
                    onClick={() => {handlePostDelete({updatedPost, setUpdatedPost})}}
                    style={{ display: 'flex', justifyContent: "center", alignItems: "center",color:"white", cursor:"pointer"}}
                >
                    <Trash/>
                </motion.div>
            </motion.div>
        </div>
    )
}

//