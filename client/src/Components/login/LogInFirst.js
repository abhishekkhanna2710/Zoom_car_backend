import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import Navbar from "../Components-Navbar/HomeNavbar"
import "../login/styles.css"


function LogInFirst() {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch('/signin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    username,
                })
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                console.log(data.username)
            }
        };
        getUsername();
    }, []);

    const loginUser = async (e) => {
        console.log("first")
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify({
                email,
                password
            })
        })

        // username= 'abhiushel'
        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid credentails");
        } else {
            window.alert('Registration Sucessfull');
            localStorage.setItem("loggedInUser", JSON.stringify({ name: "Abhishek" }));
            window.location.href = '/';

        }

    }



    return (
        <div>
            <section className='signup'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <h3 className='form-title'>Enter Details to Login Page</h3>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='form-group'>

                                <input type="email" className="menuInputItems" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />


                                <input type="password" className="menuInputItems" name="password" placeholder="Enter your password" value={password} onChange={(e) => setpassword(e.target.value)} />


                                <input className='logButton' type="submit" value="Login" name='signup' onClick={loginUser} />
                            </div>
                            <div>
                                <NavLink className='navs'
                                    to="/signup"
                                >
                                    Create an Account
                                </NavLink>
                            </div>

                        </form>

                    </div>

                </div>

            </section>


        </div>
    )
}

export default LogInFirst