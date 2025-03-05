import { useEffect, useState } from 'react'
import './Loading.css'
import { LoaderCircleIcon, LoaderCircle } from 'lucide-react'

export default function Loading(){

    const [message, setMessage] = useState("")

    useEffect(()=>{
        setTimeout(() => { 
            setMessage("Please wait 10-20 seconds... The server was put to sleep due to inactivity.");
        }, 3500);
        
    },[])
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