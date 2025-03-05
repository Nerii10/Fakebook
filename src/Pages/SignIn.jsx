import { useState, useEffect } from "react";
import { handleLogout} from "../apiRequests";
import Navbar from "../Components/Navbar";
import { apiLink } from "../apiRequests";
import "./Styles/SignIn.css"
import { LockIcon,Scale,User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function NotFound() {
    
    const [state, setState] = useState("login");  
    const [login, setLogin] = useState("");  
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState(""); 
    const [surename, setSurename] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [message, setMessage] = useState("");  
    const [token, setToken] = useState(""); 

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !surename || !email || !password || !login) {
            setMessage("Please fill in all the required fields.");
            return;
        }
    
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }
    
        try {
            const response = await fetch(`${apiLink}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password, name, surename, email }),
            });
    
            const data = await response.json();
            window.location.reload()

            if (response.ok) {
                setMessage(data.message || "Registration successful.");
            } else {
                setMessage(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("An error occurred during registration.");
        }
    };
    
     const handleLogin = async () => {
        try {
            const response = await fetch(`${apiLink}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem("token", data.token);  
                setToken(data.token);  
                setMessage("Logged in successfully");
                navigate('/');
            } else {
                setMessage(data.message || "Invalid login or password");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred during login");
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);  
        }
    }, []);  


    
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleLogoutBrowser = () =>{
        setLogin('')
        setPassword('')
        setToken('')
        setMessage('succesfully logged out')
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="Background">e</div>
            <div className="WebsiteContent">
            <h1 style={{zIndex:1}}>{state == "login" ? "Login" : "SignIn"}</h1>
            
                <div className="LoginRegisterContent">
                {state == "login" ?
                <>
                    <div className="LoginMenu">
                        <span className="Dot"></span>

                        <div style={{height:"0px"}}></div>
                        <div className="InputCredentialContainer">
                            <h2 className={login.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                                <User2Icon></User2Icon>
                                Login
                            </h2>
                            <input 
                                type="text" 
                                value={login} 
                                onChange={handleLoginChange} 
                                style={{fontSize:"16px"}}
                                className="InputCredentials"
                            />
                        </div>
                        <div style={{height:"10px"}}></div>
                        <div className="InputCredentialContainer">
                            <h2  className={password.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                                <LockIcon></LockIcon>
                                Password
                            </h2>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handlePasswordChange} 
                                style={{fontSize:"16px"}}
                                className="InputCredentials"
                            />
                        </div>
                        <motion.button 
                            className="InputCredentialButton"
                            onClick={handleLogin}  
                            style={{fontSize:"16px"}}
                            whileTap={{scale:0.9}}
                            whileHover={{scale:1.1}}
                        >
                            Login
                        </motion.button >
                        <div className="NotLoggedIn">
                            {message && <p style={{margin:0}}>{message}</p>}

                            <p onClick={()=>{setState("register")}} style={{margin:0, cursor:"pointer"}}>No account? Create one!</p>
                        </div>
                    </div>
                </> :

                <>

                 <div className="LoginMenu">

                    <div style={{height:"0px"}}></div>
                    <div className="InputCredentialContainer">
                        <h2 className={login.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                            <User2Icon></User2Icon>
                            Login
                        </h2>
                        <input 
                            type="text" 
                            value={login} 
                            onChange={handleLoginChange} 
                            style={{fontSize:"16px"}}
                            className="InputCredentials"
                        />
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div className="InputCredentialContainer">
                        <h2  className={password.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                            <LockIcon></LockIcon>
                            Password
                        </h2>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            style={{fontSize:"16px"}}
                            className="InputCredentials"
                        />
                    </div>  
                    <div style={{height:"10px"}}></div>
                    <div className="InputCredentialContainer">
                        <h2  className={name.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                            <LockIcon></LockIcon>
                            Name
                        </h2>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={handleNameChange} 
                            style={{fontSize:"16px"}}
                            className="InputCredentials"
                        />
                    </div> 
                    <div style={{height:"10px"}}></div>
                    <div className="InputCredentialContainer">
                        <h2  className={surename.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                            <LockIcon></LockIcon>
                            Surename
                        </h2>
                        <input 
                            type="text" 
                            value={surename} 
                            onChange={(event)=>{setSurename(event.target.value)}} 
                            style={{fontSize:"16px"}}
                            className="InputCredentials"
                        />
                    </div> 
                    <div style={{height:"10px"}}></div>
                    <div className="InputCredentialContainer">
                        <h2  className={email.length != 0 ? "InputCredentialLoginIn": "InputCredentialLogin"}>
                            <LockIcon></LockIcon>
                            Email
                        </h2>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(event)=>{setEmail(event.target.value)}} 
                            style={{fontSize:"16px"}}
                            className="InputCredentials"
                        />
                    </div> 
                    <div style={{height:"10px"}}></div>
                    
                    <motion.button 
                        className="InputCredentialButton"
                        style={{fontSize:"16px"}}
                        whileTap={{scale:0.9}}
                        whileHover={{scale:1.1}}
                        onClick={()=>{state == "login" ? setState("register") : handleRegister()}}  
                    >
                        Register
                    </motion.button >

                    {message && <p>{message}</p>}

                </div>

                </>}

                {/*token && <p>Logged in! Token: {token}</p>*/}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br><br></br>
                <br></br>
                <br></br>
                <br></br>
                
                </div>
            </div>
        </>
    );
    
}
