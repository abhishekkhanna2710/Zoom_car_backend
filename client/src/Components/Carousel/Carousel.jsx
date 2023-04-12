import React from 'react'
import "./Carousel.css"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



function Carousel() {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const handleClick = () => {
        if (loggedInUser) {
            navigate("/BookingCars");
        } else {
            alert('Please log in to book a car.');
            navigate("/login");
        }
    };
    return (
        <div>
            <div className="hero-image">
                <div className="hero-text">
                    <h4>WE HAVE EVERYTHING </h4>
                    <h1>YOUR CAR NEEDS</h1>

                </div>
                <div>


                    {/* <Link to="/BookingCars">
                        <button type="button">Book Now <i class="fa-solid fa-arrow-right"></i></button>
                    </Link> */}

                    <button type="button" onClick={handleClick}>
                        Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>


                </div>

            </div>
        </div >
    )
}

export default Carousel