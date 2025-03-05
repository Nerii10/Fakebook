import Navbar from "../Components/Navbar";
import './Styles/Help.css'

export default function Help() {

    
    return (
        <>
            <Navbar></Navbar>
            <div className="WebsiteContent" style={{gap:"30px"}}>
                <h1>Fakebook Help</h1>

                <div className="HelpEntry">
                    <h2>Introduction</h2>
                    <p>Welcome to Fakebook! Fakebook is a platform where you can connect with friends, share your thoughts, and interact with posts. Here's how you can get started:</p>
                </div>

                <div className="HelpEntry">
                <h2>How to Post</h2>
                    <p>To create a post, simply click on the input box at the top of the page, type your message, and click the "Post" button. You can also add images and tag your friends in the post!</p>
                </div>

                <div className="HelpEntry">
                <h2>Commenting and Interaction</h2>
                    <p>You can comment on posts, like them, and share your own thoughts! Simply click on the comment section below each post, type your message, and submit it.</p>
                </div>

                <div className="HelpEntry">
                <h2>Managing Your Account</h2>
                    <p>Update your profile by clicking on your avatar. You can change your profile picture, cover photo, and personal details anytime.</p>
               </div>

                <div className="HelpEntry">
                <h2>Security</h2>
                    <p>Your privacy matters. Ensure your password is strong, and be mindful of what you share online. Fakebook will never share your information without your consent.</p>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </div>
        </>
    );
}
