import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleLocalUserDataDownload, handlePostDownload } from "../apiRequests";
import './Styles/Home.css';
import Navbar from "../Components/Navbar";

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
        if (!Localpost || !Localpost.content.trim()) return; // Zabezpieczenie, by nie wysłać pustego posta

        try {
            const response = await fetch('http://localhost:8000/api/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Localpost),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
            }

            // Dodaj nowy post do istniejących
            const newPost = await response.json();
            setPosts(prevPosts => [...prevPosts,newPost.post ]); // Dodaj nowy post na początek

            // Opcjonalnie, wyczyść formularz
            setLocalpost({ ...Localpost, content: "" });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar />
            <div className="WebsiteContent">
                <h1>Catch up on the latest!</h1>

                <div className="FeedInput">
                    <input
                        className="FeedInputText"
                        type="text"
                        placeholder="What's on your mind?"
                        value={Localpost ? Localpost.content : ""}
                        onChange={handleLocalpostContent}
                    />
                    <input
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
                            <div className="Post" key={index}>
                                <div style={{ width: "90%", height: "90%", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div className="PostData">
                                        <Link to={`/users/${post.userid}`}>{post.username}</Link>
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="PostContent">
                                        <span>{post.content}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>

            <br /><br /><br /><br /><br />
        </>
    );
}
