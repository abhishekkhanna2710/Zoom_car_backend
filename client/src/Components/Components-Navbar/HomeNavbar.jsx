import React from 'react'
import { useState } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom'

function HomeNavbar() {
    const [logoutClicked, setLogoutClicked] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const logoutt = () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
        setLogoutClicked(true);
    }
    return (
        <div className='navbar'>
            <div className="containered">
                <div className="logo">
                    <i className="fa-solid fa-grip-lines"></i>
                    <Link to="/"><img src="https://www.zoomcar.com/build/98e56e8b0b91e8806885a22ac2bf69a7.png" alt="" /></Link>

                </div>

                <div className='left_Content'>

                    <Link to="/HostingPage"> <button>Become a Host</button></Link>
                    <Link className='linked' to="/ZMS">ZMS</Link>
                    {loggedInUser ? <span className='linked'>{loggedInUser.username}</span> : <Link className='linked' to="/login">Login</Link>}

                    {!logoutClicked && (
                        <button onClick={logoutt} style={{ color: "white" }}><i class="fa-solid fa-right-from-bracket"></i></button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar