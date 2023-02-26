import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import CommentsPage from "./comments/CommentsPage"
import { useNavigate } from "react-router-dom"
function Homepage({ user }) {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState("home")
    const [uid, setUid] = useState(null)
    const [isVerified, setIsVerified] = useState(null)
    const [showCommentPage, setShowCommentPage] = useState(false)

    const [commentPost, setCommentPost] = useState({
        imageUrls: "", title: "", caption: "", dateTime: ""
    })

    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
            if (user.uid) {
                setUid(user.uid)
            }
            if (user.emailVerified) {
                setIsVerified(user.emailVerified)
            }
        }
    }, [user])

    const changePage = (page) => {
        setCurrentPage(page)
    }

    const handlePostClick = (post) => {
        setShowCommentPage(!showCommentPage)
        setCommentPost(post)

    }





    return (
        <>
            <Navbar currentPage={currentPage} changePage={changePage} />

            <div className='homepage'>
                {currentPage === "home" && <Posts handlePostClick={handlePostClick} />}
                {currentPage === "add" && <AddPostPage uid={uid} changePage={changePage} isVerified={isVerified}
                />}
            </div>

            <CommentsPage showCommentPage={showCommentPage} commentPost={commentPost} />

            {/* <button onClick={() => { setShowCommentPage(!showCommentPage) }}>Click</button> */}

        </>
    )
}

export default Homepage