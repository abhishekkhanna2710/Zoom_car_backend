import React from 'react'
import "../login/styles.css"
import { useState } from 'react'
import { NavLink } from "react-router-dom";

function SignUp() {
    // const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const handleInputs = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, password, cpassword
            })
        })
        localStorage.setItem("loggedInUser", JSON.stringify({ name: name }));
        const data = await res.json();

        if (!data) {
            window.alert('Invalid Registration');
            console.log("Invalid Registration");
        } else {
            window.alert('Registration Sucessfull');
            console.log("Registration Sucessfull");
            window.location.href = '/login';
            // history.push("/login")
        }
    }

    return (
        <div>
            <section className='signup'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <h3 className='form-title'>Enter Details to Sign Up</h3>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='form-group'>

                                <input type="email" className="menuInputItems" name="email" placeholder="Enter your email" value={user.email} onChange={handleInputs} />

                                <input type="text" className="menuInputItems" name="name" placeholder="Enter your name" value={user.name} onChange={handleInputs} />

                                <input type="password" className="menuInputItems" name="password" placeholder="Enter your password" value={user.password} onChange={handleInputs} />

                                <input type="password" className="menuInputItems" name="cpassword" placeholder="Confirm your password" value={user.cpassword} onChange={handleInputs} />

                                <input className='logButton' type="submit" value="register" name='signup' onClick={postData} />
                            </div>
                            <div>
                                <NavLink className='navs'
                                    to="/login"
                                >
                                    Already Have an Account
                                </NavLink>
                            </div>

                        </form>

                    </div>

                </div>

            </section>


        </div>
    )
}

export default SignUp