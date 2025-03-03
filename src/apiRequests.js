const apiLink = 'https://fakebookbakcend.onrender.com'
    //http://localhost:8000

export const handleLocalUserDataDownload = async ({setLocaluser}) => {
    try {
        const response = await fetch(`${apiLink}/api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            const errorText = await response.text();  
            console.error("Error response:", errorText);  
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); 
        setLocaluser(data.decodedData.user);  
    } catch (err) {
        console.error("Error fetching user data:", err);
        return "Error fetching user data:";  
    }
};

export const handleUserDataDownload = async ({setUser, id}) => {
    if(id){
        try {
            const response = await fetch(`${apiLink}/api/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text();  
                console.error("Error response:", errorText);  
                window.location.href='/404'
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json(); 
            setUser(data);  
        } catch (err) {
            console.error("Error fetching user data:", err);
            return "Error fetching user data:";  
        }
    }
};

export const handleLogout = async () => {
    localStorage.removeItem("token")
    window.location.reload();
}

export const handlePostDownload = async ({setPosts}) => {
    try{
        const response = await fetch(`${apiLink}/api/post`,{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
            }
        })
        
        const data = await response.json()

        setPosts(data.posts)

    } catch (err) {
        console.log(err)
    }
}