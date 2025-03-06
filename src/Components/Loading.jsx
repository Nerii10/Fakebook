import { useEffect, useState } from 'react'
import './Loading.css'
import { LoaderCircleIcon, LoaderCircle } from 'lucide-react'

export default function Loading({LoadingText}){

    const [message, setMessage] = useState("")

    if(!LoadingText){
        useEffect(()=>{
        setTimeout(() => { 
            setMessage("Please wait 10-20 seconds... The server has been put to sleep due to inactivity. In the meantime, please keep refreshing every 5 seconds.");
        }, 3500);
        },[])
    } else {
        useEffect(()=>{
            setTimeout(() => { 
                setMessage(LoadingText);
            }, 0);
            },[])
    }
    
    return(
        <>
            <div className="LoadingScreen">
                <div style={{height:"400px"}}></div>
                <LoaderCircle className='Loader'></LoaderCircle>
                    <div 
                    style={{width:"80%",textAlign:"center"}}
                   
                    >
                        <p>{message && message}</p>
                    </div>
            </div>
        </>
    )
}