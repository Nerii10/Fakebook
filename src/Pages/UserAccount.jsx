import { useParams } from 'react-router-dom';
import { handleLocalUserDataDownload ,handlePostDownload,handleUserDataDownload } from '../apiRequests';
import { useState,useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Post from '../Components/Post';
import { apiLink } from '../apiRequests';

export default function UserAccount() {

    const { id } = useParams();

    const [Localuser,setLocaluser] = useState(null)
    const [User,setUser] = useState(null)
    const [Posts,setPosts] = useState(null)

    //DataEditing

    const [Birthdate, setBirthdate] = useState("")
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Surename, setSurename] = useState("")
    const [Interests, setInterests] = useState("")

    useEffect(()=>{
        handlePostDownload({setPosts})
        handleLocalUserDataDownload({setLocaluser})
        handleUserDataDownload({setUser,id})
    },[])

    async function handleUserDataUpdate() {
        const UserNewData = {
            birthdate: Birthdate,
            description: Description
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
                console.log(data)
            } else {
                    console.log(data.message); 
            }
        
        } catch (error) {
                console.error("Wystąpił błąd:", error);
        }

    }

    async function handleAcceptFriend({senderId}){
        try {
                const response = await fetch(`${apiLink}/api/friends/accept/${User._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({Localuser, senderId}), 
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

                {Localuser && id && id === Localuser._id ? 
                <MyProfile User={User} LocalUser={Localuser}></MyProfile>
                :
                <OtherProfile User={User} Localuser={Localuser}></OtherProfile>
            }
                <br></br>
                {Localuser && id && id === Localuser._id? 
                <>
                <h2>FriendRequests</h2>
                <div>{Localuser.friendRequests && Localuser.friendRequests.map((request,index)=>{
                    return(
                        <>  
                        <div>
                            {request} 
                            <button onClick={()=>{handleAcceptFriend({senderId: request})}}>accept</button>
                        </div>
                        </>
                    )
                })} </div>
                
               
                </>
                : ""}
                <br></br>

                <h2>Friends</h2>
                <div>{User && User.friends && User.friends.map((friend,index)=>{
                    return(
                        <>  
                        <div>
                            {friend} 
                        </div>
                        </>
                    )
                })} </div>
                <br></br><br></br>
                <div style={{height:"300px", backgroundColor:"rgba(44, 44, 44, 0.301)",border: "1px rgba(255, 255, 255, 0.534) solid", borderRadius:'15px', display:'flex',justifyContent:"center"}}>
                    <div style={{padding:"20px",width:"100%"}}>
                        {User ? (
                        <>
                        <p>{User.description}</p>
                        <p>{User.email}</p>
                        <p>{User.birthdate}</p>
                        <p>{User.interests}</p>
                        </>) : " "}
                           
                        {Localuser && User && Localuser._id === User._id &&
                        <>
                        <input type="date" onChange={(event)=>{setBirthdate(event.target.value)}}></input> 
                        <br></br>
                        <input type='text' placeholder='change description' value={Description} onChange={(event)=>{setDescription(event.target.value)}}></input>
                        <br></br>
                        
                        
                        <button onClick={()=>{handleUserDataUpdate()}}>Save</button>

                        </>
                        }
                        </div>
                </div>


                <h1 style={{textTransform:"capitalize"}}></h1>
                <div className="Feed">
                    
                    {Localuser ? Posts && Posts.toReversed().map((post,index)=>{
                        if(post.userid === id){
                        return(
                            <>
                                <Post index={index} post={post} LocalUser={Localuser}></Post>
                            </>
                        )}
                    }): "Login to discover more"} 
                </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </>
    )
}

export function MyProfile({User,LocalUser}) {
    return(
        <>  
         <div style={{position:"relative",zIndex:-0, maxHeight:"400px",overflow:'hidden'}}>
            <img src='/Fakebook/test.jpg' style={{width:"100%",margin:0,zIndex:0}}></img>
            <h1 style={{textTransform:"capitalize",position:"absolute",zIndex:0,bottom:0,left:"20px", backgroundColor:"rgba(44, 44, 44, 0.51)", backdropFilter:"blur(5px)",padding:"5px", borderRadius:'5px',border:"rgba(255, 255, 255, 0.6) 1px solid"}}>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
        </div>
        </>
    )
}

export function OtherProfile({User,Localuser}) {

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
            <div style={{width:"100%",position:"relative",zIndex:-0, maxHeight:"400px"}}>
                <img src='/Fakebook/test.jpg' style={{width:"100%",margin:0,zIndex:0}}></img>
                <div style={{display:'flex',justifyContent:'center',alignItems:"center",width:"100%", position:"relative"}}>
                    <div style={{width:"100%", textTransform:"capitalize",position:"absolute",zIndex:0,bottom:0, backgroundColor:"rgba(44, 44, 44, 0.51)", backdropFilter:"blur(5px)", borderRadius:'0px',border:"rgba(255, 255, 255, 0.6) 1px solid", display:"flex", justifyContent:'space-between', alignItems:"center",borderRadius:"15px"}}>
                        <h1 style={{margin:0}}>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
                        <button onClick={()=>{handleAddFriend()}}>Add friend</button>
                    </div >
                </div>
            </div>
        </>
    )
}