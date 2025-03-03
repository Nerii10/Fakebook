import { Link } from "react-router-dom"
import './Navbar.css'
import { useState,useEffect } from "react"
import { handleLocalUserDataDownload, handleLogout } from "../apiRequests"
import {motion} from 'framer-motion'
import { Book, BookA} from "lucide-react"

export default function Navbar(){

    const [Localuser,setLocaluser] = useState(null)
    const [NavbarOpen, setNavbarOpen] = useState(0)

    useEffect(()=>{
        handleLocalUserDataDownload({setLocaluser})
    },[])
    
    useEffect(()=>{
        console.log(Localuser)
    },[Localuser])

    function handleNavbarOpen(){
        setNavbarOpen(prev => (prev == 0 ? 1 : 0))
    }

    return(
        <>
            <br></br>
            <br></br>
            <div style={{height:"13px"}}></div>

            <div className="NavbarContainer">
                <div style={{width:"90%", display:'flex', flexDirection:"row", justifyContent:"space-between", alignItems:"center", position:"relative"}}>
                    <Link to={"/"} style={{textDecoration:"none", color:"white", display:"flex", justifyContent:'center', alignItems:"center", gap:"10px"}}>
                        <h1>Fakebook</h1> 
                        <BookA></BookA>
                    </Link>
                    {Localuser ?
                    (
                    <>
                    <button onClick={handleNavbarOpen}
                    className="NavbarButton"
                    >{Localuser ? Localuser.name : "SignIn"}</button>

                    <motion.div className={"NavbarUser"}
                    animate={NavbarOpen ? {height: "270px",  padding: "0px 10px"} : {height: "0px", padding:"0px 10px", border: "rgba(255, 255, 255, 0) 0px solid"}}
                    transition={{ease:"circInOut"}}
                    >
                        <Link to={Localuser && `/users/${Localuser._id}`} style={{textDecoration:"none",textTransform:"capitalize", color:"white"}}>
                        <h3 className="NavbarUserAction">Account</h3>
                        </Link>
                        <h3 className="NavbarUserAction">Settings</h3>
                        <h3 className="NavbarUserAction">Help</h3>
                        <h3 className="NavbarUserAction" onClick={handleLogout}>Logout</h3>
                    </motion.div>
                    </>) : 
                    <>
                    <Link to={Localuser ?`/users/${Localuser._id}` : "/signIn"} style={{textDecoration:"none",textTransform:"capitalize"}}><h1>{Localuser ? Localuser.name : "SignIn"}</h1></Link>

                    </>
                    }
                </div>
           </div>
        </>
    )
}
//