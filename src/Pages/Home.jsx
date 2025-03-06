import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleLocalUserDataDownload, handlePostDownload } from "../apiRequests";
import './Styles/Home.css';
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { apiLink } from "../apiRequests";
import { Image } from "lucide-react";

export default function Home() {
    const [Localuser, setLocaluser] = useState(null);
    const [Localpost, setLocalpost] = useState(null);
    const [Posts, setPosts] = useState([]);
    const [File, setFile] = useState('')
    const [Pendingpost, setPendingpost] = useState(0)
    const [Friends, setFriends] = useState(null)
    

   
    useEffect(() => {
        handlePostDownload({ setPosts });
        handleFriendsProfilepictures()
        handleLocalUserDataDownload({ setLocaluser });
    }, []);

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const hours = today.getHours(); 
    const minutes = today.getMinutes(); 
    const seconds = today.getSeconds(); 
    const welcomeMessage = 'Catch up on the latest!'
    
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const fullDate = `${time} - ${day}/${month}/${year}`;

    function handleLocalpostContent(event) {
        setLocalpost({
            "content": event.target.value,
            "userid": Localuser?._id,
            "username": Localuser?.name,
            "date": fullDate,
            "image": File,
        });
    }

    useEffect(()=>{
        setLocalpost({
            "content": Localpost?.content,
            "userid": Localuser?._id,
            "username": Localuser?.name,
            "date": fullDate,
            "image": File,
        });
    },[File])

    async function handlePostAddition() {
        if (!Localuser) {
            console.log("Login first");
            return;
        }

        if (!Localpost.image && !Localpost.content) {
            return;
        }
        

        const formData = new FormData();
    
        formData.append('content', (Localpost.content == undefined ? "-" : Localpost.content));
        formData.append('userid', Localuser._id);
        formData.append('username', Localuser.name);
        formData.append('date', Localpost.date);
    
        if (Localpost.image) {
            formData.append('image', Localpost.image);  
        }
        
        setLocalpost()
        setPendingpost(1)

        try {
            const response = await fetch(`${apiLink}/api/post`, {
                method: "POST",
                body: formData,  
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log(data.newPost);
                setTimeout(() => { window.location.reload() }, 200);
            } else {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
            }
    
        } catch (err) {
            console.log(err);
        }
    }

    async function handleFriendsProfilepictures() {
        try {
            const response = await fetch(`${apiLink}/api/friends/profilepictures`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                const data = await response.json(); 
                setFriends(data.users)
                console.log(data.users)
            } else {
                console.error('Błąd odpowiedzi:', response.status);
            }
        } catch (err) {
            console.log('Wystąpił błąd:', err);
        }
    }

    
    return (
        <>
            <Navbar />
                {Pendingpost == 0 ? 
                <>
                        {Posts.length > 0 
                        ? 
                        (<>

                        <div className="WebsiteContent">
                            
                        <h1>
                        {welcomeMessage?.split(' ').map((word, index) => {
                        return (
                            <>
                            <motion.span
                            key={index} 
                            style={{ margin: 0, display: 'inline-block' }}
                            initial={{ opacity: 0, scale: 1, y: -50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                type: "spring", 
                                stiffness: 300,
                                damping: 25,   
                                mass: 0.1,      
                                velocity: 20,
                                restDelta: 0.5, 
                                restSpeed: 0.2, 
                                delay: index * 0.2, 
                                duration: 1.5, 
                                ease: "circInOut", 
                            }}
                        >
                            
                {word}
            </motion.span>



                            <span> </span></>
                            );})}
                            </h1>

                            <div className="FeedInput" style={{maxWidth:"100%"}}>
                            

                            <div className="FeedInput">
                                <motion.input
                                    whileFocus={{scale:0.9}}
                                    className="FeedInputText"
                                    disabled={!Localuser || Pendingpost}
                                    type="text"
                                    placeholder="What's on your mind?"
                                    value={Localpost ? Localpost.content : ""}
                                    onChange={handleLocalpostContent}
                                />

                                <label className="file-label">
                                <input 
                                    type="file" 
                                    accept="image/jpeg, image/png, image/webp, image/gif" 
                                    disabled={!Localuser || Pendingpost}
                                    style={!Localuser ? {backgroundColor:"transparent"} : {backgroundColor:"white"}}
                                    className="file-input" 
                                    onChange={(event) => { setFile(event.target.files[0]); }} 
                                />
                                <span className="file-attachment"><Image></Image></span>
                                
                                </label>
                            </div>
                                <motion.input
                                    whileTap={{scale:0.9}}
                                    whileHover={{scale:1.1}}
                                    className="FeedInputButton"
                                    disabled={!Localuser || Pendingpost}
                                    type="button"
                                    value={"Post"}
                                    onClick={handlePostAddition}
                                />
                            </div>

                            <br />

                            <div className="Feed">
                            {Friends && Posts.length > 0 ? (
                                    Posts.toReversed().map((post, index) => (
                                        <Post 
                                            key={index} 
                                            index={index} 
                                            post={post} 
                                            LocalUser={Localuser} 
                                            userprofile={Friends.find(fr => fr._id === post.userid)} 
                                        />
                                    ))
                                    ) : (
                                        "Loading..."
                                    )}
                            </div>
                        </div>

                        <br /><br /><br /><br /><br />

                        </>
                        ) : (
                        <>
                            <Loading></Loading>
                        </>
                        )}
                </>
                : 
                <Loading LoadingText={"Uploading file.... please wait"}></Loading>
                }
        </>
    );
}
