import { useState } from "react"
import { Link } from "react-router-dom"
import './Post.css'
import { Trash, ThumbsDown, ThumbsUp } from "lucide-react"
import { motion } from 'framer-motion'

const apiLink = 'https://fakebookbakcend.onrender.com'
    //http://localhost:8000

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

async function handlePostDelete({ post, setPost }) {
    try {
        const response = await fetch(`${apiLink}/api/post`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        });
        window.location.reload()
        if (response.ok) {
            // Usuń post po usunięciu
            setPost(null); // Możesz ustawić post na null lub usunąć z listy postów
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
        }
    } catch (err) {
        console.log(err);
    }
}

async function handlePostCommentAddition({ post, LocalUser, setPost }){
    
}

export default function Post({ index, post, LocalUser }) {
    const [Settings, setSettings] = useState(0);
    const [updatedPost, setUpdatedPost] = useState(post); // Stan dla zaktualizowanego posta
    const [Comment, setComment] = useState("");

    // Sprawdzamy, czy LocalUser jest dostępny
    const isUserLoggedIn = LocalUser != null;

    // Funkcja do obsługi polubienia posta
    const handleLike = () => {
        if (isUserLoggedIn) {
            handlePostLike({ post: updatedPost, LocalUser, setPost: setUpdatedPost });
        }
    };

    // Funkcja do obsługi disslike posta
    const handleDislike = () => {
        if (isUserLoggedIn) {
            handlePostDisslike({ post: updatedPost, LocalUser, setPost: setUpdatedPost });
        }
    };

    return (
        <div className="Post" key={index}>
            <div className="InnerPost">
                <div className="PostData">
                    <Link to={`/users/${post.userid}`}>{post.username}</Link>
                    {isUserLoggedIn && LocalUser._id === "67c56609799c6ac2b965ebdd" ? (
                        <>
                            <PostManip Settings={Settings} setSettings={setSettings} post={post} />
                        </>
                    ) : (
                        isUserLoggedIn && LocalUser._id === post.userid && (
                            <PostManip Settings={Settings} setSettings={setSettings} post={post} />
                        )
                    )}
                </div>

                <div className="PostContent">
                    <span>{updatedPost.content}</span>
                </div>
                
                <br />
                <span className="PostDate">{updatedPost.date}</span>

                <hr style={{ width: "100%" }} />

                <div className="PostRating">
                    <button
                        className="PostRatingThumb"
                        style={{
                            backgroundColor: isUserLoggedIn && updatedPost.likes.includes(LocalUser._id) ? "var(--colorInteraction)" : "var(--colorNoInteraction)",
                        }}
                        onClick={handleLike}  
                        disabled={!isUserLoggedIn} 
                    >
                        <ThumbsUp /> {updatedPost ? updatedPost.likes.length : ""}
                    </button>

                    <button
                        className="PostRatingThumb"
                        style={{
                            backgroundColor: isUserLoggedIn && updatedPost.disslikes.includes(LocalUser._id) ? "var(--colorInteraction)" : "var(--colorNoInteraction)",
                        }}
                        onClick={handleDislike} 
                        disabled={!isUserLoggedIn} 
                    >
                        <ThumbsDown /> {updatedPost ? updatedPost.disslikes.length : ""}
                    </button>
                </div>
            </div>
        </div>
    );
}


export function PostManip({ Settings, setSettings, post }) {
    return (
        <div className="PostManipulation">
            <motion.button
                onClick={() => { setSettings(prev => (prev === 1 ? 0 : 1)) }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
            >
                ...
            </motion.button>

            <motion.div
                className="PostSettings"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                animate={Settings ? { padding: "20px 5px", borderWidth: "1px", opacity: 1 } : { height: 0, padding: "0px 5px", borderWidth: "0px", opacity: 1 }}
                transition={{ ease: "circInOut", duration: 0.25 }}
            >
                <motion.div
                    onClick={() => { handlePostDelete({ post, setPost: () => {} }) }}
                    style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
                >
                    <Trash />
                </motion.div>
            </motion.div>
        </div>
    )
}

//<input type="text" placeholder="Add a comment" value={Comment} onChange={(event)=>{setComment(event.target.value)}}></input>
//<button onClick={()=>{handlePostCommentAddition({post: updatedPost, LocalUser, setPost: setUpdatedPost})}}>Post</button> 
