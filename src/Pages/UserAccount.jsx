import { useParams } from 'react-router-dom';
import { handleLocalUserDataDownload ,handlePostDownload,handleUserDataDownload } from '../apiRequests';
import { useState,useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

export default function UserAccount() {

    const { id } = useParams();

    const [Localuser,setLocaluser] = useState(null)
    const [User,setUser] = useState(null)
    const [Posts,setPosts] = useState(null)

    useEffect(()=>{
        handlePostDownload({setPosts})
        handleLocalUserDataDownload({setLocaluser})
        handleUserDataDownload({setUser,id})
    },[])


    return(
        <> 
        
        <Navbar></Navbar>
        <div className='WebsiteContent'>

                {Localuser && id && id === Localuser._id ? 
                <MyProfile User={User}></MyProfile>
                :
                <OtherProfile User={User}></OtherProfile>
            }

                <div style={{height:"300px", backgroundColor:"rgba(44, 44, 44, 0.301)",border: "1px rgba(255, 255, 255, 0.534) solid", borderRadius:'15px'}}>
                    <ul>
                        <li>
                            {User? User._id : "-"}
                        </li>
                        <li>
                            {User? User.age : "-"}
                        </li><li>
                            {User? User.email : "-"}
                        </li>
                    </ul>
                </div>


                <h1 style={{textTransform:"capitalize"}}></h1>
                <div className="Feed">
                    
                    {Localuser && Posts && Posts.map((post,index)=>{
                        if(post.userid === id){
                        return(
                            <>
                                <div className="Post">
                                    <div style={{width:"90%",height:"90%",display:"flex",flexDirection:"column",gap:"10px"}}>
                                        <div className="PostData">
                                            <Link to={`/users/${post.userid}`}>{post.username}</Link>
                                            21:50
                                        </div>
                                        <div className="PostContent">
                                            <span>{post.content}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    })} 
                </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </>
    )
}

export function MyProfile({User}) {
    return(
        <>  

            <div style={{position:"relative",zIndex:-0, maxHeight:"400px",overflow:'hidden'}}>
            <img src='/test.jpg' style={{width:"100%",margin:0,zIndex:0}}></img>
            <h1 style={{textTransform:"capitalize",position:"absolute",zIndex:0,bottom:0,left:"20px", backgroundColor:"rgba(44, 44, 44, 0.51)", backdropFilter:"blur(5px)",padding:"5px", borderRadius:'5px',border:"rgba(255, 255, 255, 0.6) 1px solid"}}>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
        </div>
        </>
    )
}

export function OtherProfile({User}) {
    return(
        <>  
        <div style={{position:"relative",zIndex:-0, maxHeight:"400px",overflow:'hidden'}}>
            <img src='/test.jpg' style={{width:"100%",margin:0,zIndex:0}}></img>
            <h1 style={{textTransform:"capitalize",position:"absolute",zIndex:0,bottom:0,left:"20px", backgroundColor:"black"}}>{User ? `${User.name} ${User.surename}` : "Loading"}</h1>
        </div>
        </>
    )
}