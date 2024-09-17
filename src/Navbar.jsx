import React from "react";
import { BrowserRouter, Link } from "react-router-dom"
import './navbar.css'

function Navbar() {

    return (
        <>
            <BrowserRouter>
                <nav className="navbar">
                    <Link to="/" className="home-button">Home</Link> {/** Going to app jsx */}
                    <Link to="/Create" className="create-button">Create</Link>
                    <Link to="/Calendar" className="calendar-button" >Calendar</Link>
                    <Link to="/Configuration" className="config-button">Configuration</Link>
                </nav>
            </BrowserRouter>
        </>
    )
}

export default Navbar;