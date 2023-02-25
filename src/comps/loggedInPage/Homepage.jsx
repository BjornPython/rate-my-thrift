import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import { useNavigate } from "react-router-dom"
function Homepage({ user }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    const [currentPage, setCurrentPage] = useState("home")

    const changePage = (page) => {
        console.log("NEW PAGE: ", page);
        setCurrentPage(page)
    }
    return (
        <>
            <Navbar currentPage={currentPage} changePage={changePage} />

            <div className='homepage'>
                {currentPage === "home" && <Posts />}
                {currentPage === "add" && <AddPostPage />}
            </div>
        </>
    )
}

export default Homepage