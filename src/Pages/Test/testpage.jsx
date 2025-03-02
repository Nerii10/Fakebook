import { useEffect,useState } from "react"
import { Link } from "react-router-dom"

//userdata
import { handleLocalUserDataDownload,handleUserDataDownload } from "../../apiRequests"

//posts
import { handlePostDownload } from "../../apiRequests"

export default function TestPage(){
    
    //UserDataDownloading
    const id = "Test"

    const [Localuser,setLocaluser] = useState(null)
    const [User,setUser] = useState(null)

    useEffect(()=>{
        handleLocalUserDataDownload({setLocaluser})
        handleUserDataDownload({setUser,id})
    },[])

    useEffect(()=>{
        console.log(Localuser)
    },[Localuser])

    //

    

    //PostDataDownloading
    const [Localpost,setLocalpost] = useState(null)
    const [Posts,setPosts] = useState(null)

    useEffect(()=>{
    handlePostDownload({setPosts})
    },[])

    useEffect(()=>{
        console.log(Localpost)
    },[Localpost])

    function handleLocalpostContent(event){
        setLocalpost({"content":(event.target.value),"userid":Localuser._id,"username":Localuser.name})
    }

    async function handlePostAddition(){
        try{
            const response = await fetch('http://localhost:8000/api/post',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Localpost)})

                if(!response) {
                    const errorData = await response.json()
                    throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
                } else 

                console.log(response)

        } catch(err) {
            console.log(err)
        }
    } 

    //  



    return(
        <>
            <h1>Test</h1>
            <p>user - {Localuser ? Localuser.name : "Loading"} {Localuser && Localuser.surename}</p>   

            {
            //Uzytkownicy//
            }

            <h1>UserData</h1>
            {Localuser ? `${Localuser.name} ${Localuser.surename}` : "Loading - no user"}
            <br></br>
            {User ? `${User.name} ${User.surename}` : "Something went wrong"}

            {
            //Posty//
            }

            <h1>Posts</h1>
            {Posts ? Posts.map((post,index)=>{
                return(
                    <>
                        <div>
                        <Link to={`/users/${post.userid}`}>Przejdz na profil</Link>
                        <span> - {post.username} - {post.content}</span>
                        </div>
                    </>
                )
            }) :"loading" } 

            <input type="text" placeholder="Wpisz cos na post" value={Localpost ? Localpost.content : ""} onChange={handleLocalpostContent}></input>
            <input type="button" value={"post"} onClick={()=>{handlePostAddition()}}></input>
    </>
)}