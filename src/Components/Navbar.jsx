import { Link } from "react-router-dom"
import './Navbar.css'
import { useState,useEffect } from "react"
import { handleLocalUserDataDownload, handleLogout } from "../apiRequests"
import {motion} from 'framer-motion'
import { Book, BookA, User2, Settings, HelpCircle, LogOutIcon, User} from "lucide-react"

export default function Navbar(){

    const [Localuser,setLocaluser] = useState(null)
    const [NavbarOpen, setNavbarOpen] = useState(0)

    useEffect(()=>{
        handleLocalUserDataDownload({setLocaluser})
    },[])
    
    useEffect(()=>{
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
                     <motion.button
                        whileTap={{scale:0.9}}
                        whileHover={{scale:1.1}} onClick={handleNavbarOpen}
                    className="NavbarButton"
                    >{Localuser ? Localuser.name : "SignIn"}</motion.button>

                    <motion.div className={"NavbarUser"}
                    animate={NavbarOpen ? {height: "150px",  padding: "0px 20px", border: "rgba(255, 255, 255, 0.5) 1px solid"} : {height: "0px", padding:"0px 20px", border: "rgba(255, 255, 255, 0) 0px solid"}}
                    transition={{ease:"circInOut"}}
                    >   
                        
                            <Link  className="NavbarAction" to={Localuser && `/users/${Localuser._id}`} style={{textDecoration:"none",textTransform:"capitalize", color:"white"}}>
                                <User2></User2>
                                <h3 className="NavbarUserAction">Account</h3>
                            </Link>

                        <div className="NavbarAction">
                            
                            <Link  className="NavbarAction" to={Localuser && `/help`} style={{textDecoration:"none",textTransform:"capitalize", color:"white"}}>
                                <HelpCircle></HelpCircle>
                                <h3 className="NavbarUserAction">Help</h3>
                            </Link>
                        </div>

                        <div className="NavbarAction" onClick={handleLogout}>
                            <LogOutIcon></LogOutIcon>
                            <h3 className="NavbarUserAction">Logout</h3>
                        </div>

                    </motion.div>
                    </>) : 
                    <>
                    <Link to={!Localuser && "/signIn"} style={{textDecoration:"none",textTransform:"capitalize"}}><h1>{Localuser ? Localuser.name : <>
                        <motion.button
                        whileTap={{scale:0.9}}
                        whileHover={{scale:1.1}}
                        className="NavbarButton"
                        >{Localuser ? Localuser.name : "SignIn"}</motion.button>
                    
                    </>}</h1></Link>

                    </>
                    }
                </div>
           </div>
        </>
    )
}
//