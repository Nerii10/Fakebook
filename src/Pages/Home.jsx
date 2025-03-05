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
export default function Home() {
    const [Localuser, setLocaluser] = useState(null);
    const [Localpost, setLocalpost] = useState(null);
    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        handleLocalUserDataDownload({ setLocaluser });
    }, []);

    useEffect(() => {
        handlePostDownload({ setPosts });
    }, []);

    useEffect(() => {
        console.log(Localpost);
    }, [Localpost]);

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const hours = today.getHours(); 
    const minutes = today.getMinutes(); 
    const seconds = today.getSeconds(); 
    
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const fullDate = `${time} - ${day}/${month}/${year}`;

    function handleLocalpostContent(event) {
        setLocalpost({
            "content": event.target.value,
            "userid": Localuser?._id,
            "username": Localuser?.name,
            "date": fullDate,
        });
    }
    

    async function handlePostAddition() {
        if (!Localuser) {
            console.log("Login first");
            return;
        }
    
        try {
            const response = await fetch(`${apiLink}/api/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Localpost),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log(data.newPost);
               
                setTimeout(()=>{ window.location.reload()},100)
                console.log(Posts)
            } else {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
            }
    
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <>
            <Navbar />
            {Posts.length > 0 ? 
            (<>

            <div className="WebsiteContent">
                <h1>Catch up on the latest!</h1>

                <div className="FeedInput">
                    <motion.input
                        whileFocus={{scale:0.9}}
                        className="FeedInputText"
                        type="text"
                        placeholder="What's on your mind?"
                        value={Localpost ? Localpost.content : ""}
                        onChange={handleLocalpostContent}
                    />
                    <motion.input
                        whileTap={{scale:0.9}}
                        whileHover={{scale:1.1}}
                        className="FeedInputButton"
                        type="button"
                        value={"Post"}
                        onClick={handlePostAddition}
                    />
                </div>

                <br />

                <div className="Feed">
                    {Posts.length > 0 ? (
                        Posts.toReversed().map((post, index) => (
                            <Post key={index} index={index} post={post} LocalUser={Localuser}></Post>
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
    );
}
