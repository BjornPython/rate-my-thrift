import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import { useNavigate } from "react-router-dom"
function Homepage({ user }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])


    return (
        <div className='homepage'>
            <Navbar />
            <Posts />
            <div className="background-img"></div>
        </div>
    )
}

export default Homepage