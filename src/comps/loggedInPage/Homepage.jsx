import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"

function Homepage() {



    return (
        <div className='homepage'>
            <Navbar />
            <Posts />
            <div className="background-img"></div>
        </div>
    )
}

export default Homepage