import { useState, useEffect } from "react";
import { handleLogout} from "../apiRequests";
import Navbar from "../Components/Navbar";
export default function NotFound() {
    
    const [login, setLogin] = useState("");  
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState(""); 
    const [message, setMessage] = useState("");  
    const [token, setToken] = useState(""); 
    const apiLink = 'http://localhost:8000'
    //https://fakebookbakcend.onrender.com

     const handleRegister = async () => {
        try {
            const response = await fetch(`${apiLink}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password, name }), 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage(data.message); 
            } else {
                setMessage(data.message || "Wystąpił błąd podczas rejestracji"); 
            }
    
        } catch (error) {
            console.error("Wystąpił błąd:", error);
            setMessage("Wystąpił błąd podczas rejestracji");
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
                setTimeout((window.location.reload()),100)
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
            <div className="WebsiteContent">
                <h1>Sign in</h1>
                <input 
                    type="text" 
                    placeholder="login" 
                    value={login} 
                    onChange={handleLoginChange} 
                    style={{fontSize:"16px"}}
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    style={{fontSize:"16px"}}
                />
                 <input 
                    type="text" 
                    placeholder="name" 
                    value={name} 
                    onChange={handleNameChange} 
                    style={{fontSize:"16px"}}
                />
                <button 
                    onClick={handleRegister}  
                    style={{fontSize:"16px"}}
                >
                    Register
                </button>
                <button 
                    onClick={handleLogin}  
                    style={{fontSize:"16px"}}
                >
                    Login
                </button>

                <button 
                    onClick={()=>{handleLogout();handleLogoutBrowser();}}
                    style={{fontSize:"16px"}}
                >
                    LogOut
                </button>

                
                {message && <p>{message}</p>}
                {token && <p>Logged in! Token: {token}</p>}
            </div>
        </>
    );
}
