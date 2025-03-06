import { useParams } from 'react-router-dom';
import { handleLocalUserDataDownload ,handlePostDownload,handleUserDataDownload } from '../apiRequests';
import { useState,useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Post from '../Components/Post';
import { apiLink } from '../apiRequests';
import "./Styles/Userprofile.css"
import { motion } from 'framer-motion';
import { NotebookPen, Cake, Star, MailPlus, Trash } from 'lucide-react';
import Loading from '../Components/Loading'

export default function UserAccount() {

    const { id } = useParams();
    const [Friends, setFriends] = useState(null)
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
    const [Background, setBackground] = useState(User?.backgroundimage)
    const [Newprofilepic, setNewprofilepic] = useState()

    
    useEffect(()=>{
        handlePostDownload({setPosts})
        handleLocalUserDataDownload({setLocaluser})
        handleUserDataDownload({setUser,id})
        handleFriendsProfilepictures()
    },[id])

    useEffect(()=>{
        setDescription(User?.description)
        setBirthdate(User?.birthdate)
        setInterests(User?.interests)
    },[User])

    useEffect(()=>{
        setUser()
    },[id])

    useEffect(()=>{
        handleFriendsProfilepictures()
    },[])

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
            } else {
                console.error('Błąd odpowiedzi:', response.status);
            }
        } catch (err) {
            console.log('Wystąpił błąd:', err);
        }
    }
    

    async function handleUserDataUpdate() {

        const formData = new FormData();
        formData.append('image', Newprofilepic);  
        formData.append('birthdate', Birthdate);  
        formData.append('description', Description);  
        formData.append('interests', Interests);  
        formData.append('currentprofilepicture', Localuser.profilepicture)

        try {
            const response = await fetch(`${apiLink}/api/users/me`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    },
                    body: formData, 
            });
        
                const data = await response.json();


                
            if (response.ok) {
                setTimeout(() => { window.location.reload() }, 200);
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

                    if (!response.ok) {
                        console.log(data.message); 
                        
                    } else {setTimeout((window.location.reload()),100)}
            
            } catch (error) {
                    console.error("Wystąpił błąd:", error);
            }
    }

    async function handleDeclineFriend({sender,receiver}){
        try {
                const response = await fetch(`${apiLink}/api/friends/decline/${User._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({sender, receiver}), 
                });
            
                    const data = await response.json();
    
                    
                    if (!response.ok) {
                        console.log(data.message); 
                    } else {setTimeout((window.location.reload()),100)}
            
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
                        body: JSON.stringify({user: User,   Localuser}), 
                });
            
                    const data = await response.json();
                    
                    
                if (!response.ok) {
                        console.log(data.message); 
                } else {setTimeout((window.location.reload()),100)}
            
            } catch (error) {
                    console.error("Wystąpił błąd:", error);
            }
    }

    async function handleRemoveFriend({sender,receiver}){
        try {
                const response = await fetch(`${apiLink}/api/friends/remove/${User._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({sender, receiver}), 
                });
            
                    const data = await response.json();
    
                    
                if (!response.ok) {
                    console.log(data.message); 
                } else {setTimeout((window.location.reload()),100)}
            
            } catch (error) {
                    console.error("Wystąpił błąd:", error);
            }
    }

    return(
        <> 
        <Navbar></Navbar>
        
        {User ? (
        <>
            
        <div className='WebsiteContent' style={{gap:"50px"}}>


            {/*UserMainData, Adding*/}
            <div style={{position:"relative",zIndex:-0, maxHeight:"400px"}}>
                            <div className='ImageContainer'>
                                
                                <img src={User._id != "67c56609799c6ac2b965ebdd" ? `${User.backgroundimage}` : `${User.backgroundimage}`} className='UserImage'></img>
                            </div>
                                <div style={{display:'flex', justifyContent:'center', 
                                alignItems:'center',position:'relative'}}
                                >
                                    <div className='UserProfileHeader'>
                                        <div style={{width:"65%",display:'flex',justifyContent:'start', alignItems:'center', gap:"10px"}}>
                                            
                                            {User && Localuser ?Localuser._id === User._id ? 
                                            
                                            (
                                                <>
                                                   <label htmlFor="file-upload" className="change-profile-pic-label">
                                                        <p>Change picture</p>
                                                    </label>
                                                    <input 
                                                        accept="image/jpeg, image/png, image/webp, image/gif" 
                                                        type="file" 
                                                        id="file-upload"
                                                        onChange={(event) => setNewprofilepic(event.target.files[0])} 
                                                        className="changeprofilepic"
                                                    />

                                                    <img src={User.profilepicture} className='profilepicture' style={{width:"50px"}}></img>
                                                    <h1 className='UserName'>{Localuser ? `${Localuser.name} ${Localuser.surename}` : "Loading"}</h1>
                                                </>
                                            ) 
                                            
                                            : 
                                            
                                            (
                                            <>
                                                    <img src={User.profilepicture} className='profilepicture' style={{width:"50px"}}></img>
                                                    <h1 className='UserName'>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
                                            </>
                                            ): <>
                                            <h1 className='UserName'>{User ? `${User.name} ${User.surename}` : "Loading"}</h1></>}
                                                                            
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
                                                       
                                                        (User.friendRequests.some(friendrequest => friendrequest._id === Localuser._id) ? "Invitation sent" : 
                                                        <motion.button 
                                                        whileTap={{scale:0.9}}
                                                        whileHover={{scale:1.1}}
                                                        className='AddFriendButton' onClick={handleAddFriend}>
                                                        Add friend
                                                        </motion.button>)
                                                        
                                                    )
                                                ))
                                            ) : <button className='AddFriendButton'>Login to add</button> }

                                        </div>
                                    </div>
                                </div>
            </div>


            



            {/*Friend Requests*/}
                    
           

                {User && Localuser && User._id === Localuser._id &&
                <>
               
                        {User.friendRequests && User.friendRequests.map((request,index)=>{
                            return(
                                <>   
                                <div className='FriendsContainer'>
                                    <h2>Friend requests</h2>
                                        
                                    <div className='Friends'>
                                        <div className='FriendRequest'>
                                                <div style={{width:"50%"}}>
                                                    <Link to={`/users/${request._id}`} style={{width:"fit-content", textDecoration:"none"}} className="PostCreatorName">{request.name + request.surename}</Link>
                                                </div>
                                                <div className='FriendRequestAction'>
                                                <motion.button 
                                                whileTap={{scale:0.9}}
                                                whileHover={{scale:1.1}}
                                                className='AcceptFriendButton'
                                                onClick={()=>{handleAcceptFriend({sender: Localuser, receiver: request})}}>accept</motion.button>
                                            
                                                <motion.button 
                                                whileTap={{scale:0.9}}
                                                whileHover={{scale:1.1}}
                                                className='DeclineFriendButton'
                                                onClick={()=>{handleDeclineFriend({sender: Localuser, receiver: request})}}
                                                >decline</motion.button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )})} 
                </>}


            {/*Friends*/}
            <div className='FriendsContainer'>
                <h2 >Friends</h2>

                <div className='Friends'>
                    {User && User.friends && User.friends.length > 0 ? User.friends.map((friend,index)=>{
                       
                       return(
                                <>  
                                    <div className='Friend'>
                                        <div style={{display:'flex', justifyContent:'start',alignItems:"center", gap:"10px"}}>

                                        {Friends && (() => {
                                        const friendData = Friends.find(friendF => friendF._id.toString() === friend._id.toString());
                                        return friendData ? <img className="profilepicture" src={friendData.profilepicture} alt="Profile" /> : null;
                                        })()}

                                        
                                        <Link onClick={()=>{setUser(null)}} to={`/users/${friend._id}`} style={{textDecoration:"none"}}> <p className="PostCreatorName">{friend.name + " " + friend.surename}</p></Link>
                                        </div>
                                        {User && Localuser && Localuser._id === User._id &&
                                        <motion.button 
                                        whileTap={{scale:0.9}}
                                        whileHover={{scale:1.1}}
                                        className='RemoveFriendButton'
                                        onClick={()=>{handleRemoveFriend({sender: Localuser, receiver: friend})}}
                                        >
                                        <Trash></Trash>
                                        </motion.button>
                                        }
                                    </div>
                                </>
                        )}): "No Friends"} 
                </div>
            </div>



            {/*UserData*/}

            <div className='UserData'>

                        
            {/*Change Data*/}
            {User && Localuser && Localuser._id === User._id ? (
            <>

                {/* Main data */}
                <div className="UserDataInput">
                    <div style={{width:"15%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <NotebookPen className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                       <textarea
                        
                        placeholder="change description"
                        className="UserDataInput"
                        value={Description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        />
                    </div> 
                </div>

                <div className="UserDataInput">
                    <div style={{width:"15%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <MailPlus className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <p>{User.email === "" ? "-" : User.email}</p>
                    </div>
                   
                </div>

                <div className="UserDataInput">
                    <div style={{width:"15%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <Cake className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
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
                    
                </div>

                <div className="UserDataInput">
                    <div style={{width:"15%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <Star className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
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
                             <p>Music</p>
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
                             <p>Swimming</p>
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
                             <p>Cycling</p>
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
                             <p>Programming</p>
                            
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
                            <p>Playing Games</p>
                        </label>
                        
                    </>
                    }</div>
                    </div>
                   
                
                </div>

                <motion.button 
                whileTap={{ scale: 0.9 }} 
                className="AddFriendButton" 
                onClick={() => {
                    handleUserDataUpdate()
                }}
                >
                Save
                </motion.button>


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
                    <div style={{width:"10%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <NotebookPen className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <p style={{ whiteSpace: "pre-wrap" }}>{User?.description === "" ? "-" : User?.description}</p>
                    </div> 
                </div>
                


                <div className="UserDataInput">
                    <div style={{width:"10%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <MailPlus className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                    <p>{User?.email === "" ? "-" : User?.email}</p>
                    </div> 
                </div>

                <div className="UserDataInput">
                    <div style={{width:"10%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <Cake className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                    <p>{User?.birthdate === "" ? "-" : User?.birthdate}</p>
                    </div> 
                </div>

                <div className="UserDataInput">
                <div style={{width:"10%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                        <Star className='DataIcon'/>
                    </div>
                    <div style={{width:"85%",display:'flex',justifyContent:"start",alignItems:'center'}}>
                    <p>{User?.interests === "" ? "-" : User?.interests}</p>
                    </div> 
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

                    <div className="Feed">

                        {Friends && Localuser ? Posts && Posts.toReversed().map((post,index)=>{
                            if(post.userid === id){
                            return(
                                <>
                                    <Post index={index} post={post} LocalUser={Localuser}  userprofile={Friends.find(fr => fr._id === post.userid)} ></Post>
                                </>
                            )}}): "Login to discover more"} 

                    </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>


            </div>
        </>
        ) : (
        <>
            <Loading></Loading>
        </>
        )}
        
        </>
    )
}
