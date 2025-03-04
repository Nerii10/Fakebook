import { useParams } from 'react-router-dom';
import { handleLocalUserDataDownload ,handlePostDownload,handleUserDataDownload } from '../apiRequests';
import { useState,useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Post from '../Components/Post';
import { apiLink } from '../apiRequests';
import "./Styles/Userprofile.css"

import { NotebookPen, Cake, Star, MailPlus } from 'lucide-react';

export default function UserAccount() {

    const { id } = useParams();

    const [Localuser,setLocaluser] = useState(null)
    const [DynamicLocaluser,setDynamicLocaluser] = useState(null)
    const [User,setUser] = useState(null)
    const [Posts,setPosts] = useState(null)

    //DataEditing

    const [Birthdate, setBirthdate] = useState("")
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState(User?.description)
    const [Surename, setSurename] = useState("")
    const [Interests, setInterests] = useState([])

    useEffect(()=>{
        handlePostDownload({setPosts})
        handleLocalUserDataDownload({setLocaluser})
        handleUserDataDownload({setUser,id})
    },[id])

    useEffect(()=>{
        setDescription(User?.description)
        setBirthdate(User?.birthdate)
        setInterests(User?.interests)
    },[User])

    useEffect(()=>{
        console.log(Interests)
    }, [Interests])
    async function handleUserDataUpdate() {
        const UserNewData = {
            birthdate: Birthdate,
            description: Description,
            interests: Interests
        }

        try {
            const response = await fetch(`${apiLink}/api/users/me`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(UserNewData), 
            });
        
                const data = await response.json();

               
                
            if (response.ok) {
                
            } else {
                    console.log(data.message); 
            }
        
        } catch (error) {
                console.error("Wystąpił błąd:", error);
        }

    }

    async function handleAcceptFriend({sender,receiver}){
        try {
                const response = await fetch(`${apiLink}/api/friends/accept/${User._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({sender, receiver}), 
                });
            
                    const data = await response.json();
    
                    
                if (response.ok) {
                    console.log(data)
                } else {
                        console.log(data.message); 
                }
            
            } catch (error) {
                    console.error("Wystąpił błąd:", error);
            }
    }

    async function handleAddFriend(){
        try {
                const response = await fetch(`${apiLink}/api/friends/${User._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({user: User,Localuser}), 
                });
            
                    const data = await response.json();
    
                    setTimeout((window.location.reload()),100)
                    
                if (response.ok) {
                    console.log(data)
                } else {
                        console.log(data.message); 
                }
            
            } catch (error) {
                    console.error("Wystąpił błąd:", error);
            }
    }

    return(
        <> 

        <Navbar></Navbar>
        
        <div className='WebsiteContent'>


        {/*UserMainData, Adding*/}
        <div style={{position:"relative",zIndex:-0, maxHeight:"400px"}}>
                        <img src='/Fakebook/test.jpg' className='UserImage'></img>
                            <div style={{display:'flex', justifyContent:'center', 
                            alignItems:'center',position:'relative'}}
                            >
                                <div className='UserProfileHeader'>
                                    <div style={{width:"65%",display:'flex',justifyContent:'start', alignItems:'center'}}>
                                        
                                        {User && Localuser ?Localuser._id === User._id ? 
                                        
                                        (
                                            <>
                                                <h1 className='UserName'>{Localuser ? `${Localuser.name} ${Localuser.surename}` : "Loading"}</h1>
                                            </>
                                        ) 
                                        
                                        : 
                                        
                                        (
                                        <>
                                                <h1 className='UserName'>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
                                        </>
                                        ): <><h1 className='UserName'>{User ? `${User.name} ${User.surename}` : "Loading"}</h1></>}
                                                                           </div>
                                    <div style={{width:"35%", display:'flex',justifyContent:'center', alignItems:'center'}}>

                                    {User && Localuser ? Localuser._id === User._id ? 
                                        
                                        (
                                        <>
                                            <p style={{margin:0}}>Your account</p>
                                        </>
                                        ) 
                                        
                                        : 
                                        
                                        (
                                            (User && Localuser && (
                                                User.friends.some(friend => friend._id === Localuser._id) ? (
                                                    "Already Friends"
                                                ) : (
                                                    <button className='AddFriendButton' onClick={handleAddFriend}>
                                                        Add friend
                                                    </button>
                                                )
                                            ))
                                        ) : <button className='AddFriendButton'>Login to add</button> }

                                    </div>
                                </div>
                            </div>
        </div>


           

        <br></br>


        {/*Friend Requests*/}
                

        
            {User && id && Localuser && id === Localuser._id &&
            <>
            <div className='FriendRequests'>
                <h2>FriendRequests</h2>
                    
                <div>{User.friendRequests && User.friendRequests.map((request,index)=>{
                        return(
                            <>  
                                <div>
                                    {request.name + request.surename} 
                                    <button onClick={()=>{handleAcceptFriend({sender: Localuser, receiver: request})}}>accept</button>
                                </div>
                            </>
                        )})} 
                </div>
            </div></>}
        <br></br>


        {/*Friends*/}
        <div className='Friends'>
            <h2>Friends</h2>

            <div>{User && User.friends && User.friends.length > 0 ? User.friends.map((friend,index)=>{
                    return(
                            <>  
                                <div>
                                    <Link to={`/users/${friend._id}`}>{friend.name + " " + friend.surename} </Link>
                                </div>
                            </>
                    )}): "No Friends"} 
            </div>
        </div>

        <br></br><br></br>


         {/*UserData*/}

        <div className='UserData'>

                    
        {/*Change Data*/}
        {User && Localuser && Localuser._id === User._id ? (
        <>

            {/* Main data */}
            <div className="UserDataInput">
                <NotebookPen className='DataIcon'/>
                <textarea
                
                placeholder="change description"
                className="UserDataInput"
                value={Description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                />
            </div>

            <div className="UserDataInput">
                <MailPlus className='DataIcon'/>
                <p>{User.email === "" ? "-" : User.email}</p>
            </div>

            <div className="UserDataInput">
                <Cake className='DataIcon'/>
                <input
                    type="date"
                    placeholder="change description"
                    className="UserDataInput"
                    value={Birthdate}
                    onChange={(event) => {
                        setBirthdate(event.target.value);
                    }}
                    />
            </div>

            <div className="UserDataInput">
                <Star className='DataIcon'/>
                <div className='Interests'>
                {Interests && 
                <>
                    <label>
                        <input
                            type="checkbox"
                            value="Music"
                            checked={Interests.includes("Music")}
                            onChange={(event) => {
                            const newInterests = event.target.checked
                                ? [...Interests, "Music"] 
                                : Interests.filter((interest) => interest !== "Music");
                            setInterests(newInterests); 
                            }}
                        />
                        Music
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Swimming"
                            checked={Interests.includes("Swimming")}
                            onChange={(event) => {
                            const newInterests = event.target.checked
                                ? [...Interests, "Swimming"] 
                                : Interests.filter((interest) => interest !== "Swimming");
                            setInterests(newInterests); 
                            }}
                        />
                        Swimming
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Cycling"
                            checked={Interests.includes("Cycling")}
                            onChange={(event) => {
                            const newInterests = event.target.checked
                                ? [...Interests, "Cycling"] 
                                : Interests.filter((interest) => interest !== "Cycling");
                            setInterests(newInterests); 
                            }}
                        />
                        Cycling
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Programming"
                            checked={Interests.includes("Programming")}
                            onChange={(event) => {
                            const newInterests = event.target.checked
                                ? [...Interests, "Programming"] 
                                : Interests.filter((interest) => interest !== "Programming");
                            setInterests(newInterests); 
                            }}
                        />
                        Programming
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Playing Games"
                            checked={Interests.includes("Playing Games")}
                            onChange={(event) => {
                            const newInterests = event.target.checked
                                ? [...Interests, "Playing Games"] 
                                : Interests.filter((interest) => interest !== "Playing Games");
                            setInterests(newInterests); 
                            }}
                        />
                        Playing Games
                    </label>
                    
                </>
                }</div>
            
            </div>

            <button className='AddFriendButton' onClick={() => { handleUserDataUpdate(); }}>Save</button>

            {User.description === "" &&
            User.email === "" &&
            User.birthdate === "" &&
            User.interests === "" &&
            "No data"}
        </>
        ) : (
        <>
            {/* Main data */}
            <div className="UserDataInput">
            <NotebookPen />
            <p>{User?.description === "" ? "-" : User?.description}</p>
            </div>

            <div className="UserDataInput">
            <MailPlus />
            <p>{User?.email === "" ? "-" : User?.email}</p>
            </div>

            <div className="UserDataInput">
            <Cake />
            <p>{User?.birthdate === "" ? "-" : User?.birthdate}</p>
            </div>

            <div className="UserDataInput">
            <Star />
            <p>{User?.interests === "" ? "-" : User?.interests}</p>
            </div>

            {User?.description === "" &&
            User?.email === "" &&
            User?.birthdate === "" &&
            User?.interests === "" &&
            "No data"}
        </>
        )}
        </div>

                {/*Feed*/}

                <h1 style={{textTransform:"capitalize"}}></h1>

                <div className="Feed">

                    {Localuser ? Posts && Posts.toReversed().map((post,index)=>{
                        if(post.userid === id){
                        return(
                            <>
                                <Post index={index} post={post} LocalUser={Localuser}></Post>
                            </>
                        )}}): "Login to discover more"} 

                </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>


        </div>
        </>
    )
}
