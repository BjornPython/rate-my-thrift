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
        <>
            <Navbar />

            <div className='homepage'>

                <Posts />
                <div className="background-img"></div>
            </div>
        </>
    )
}

export default Homepage