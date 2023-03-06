import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import CommentsPage from "./comments/CommentsPage"
import ProfilePage from "./profile/ProfilePage"
import { useNavigate } from "react-router-dom"
import { getDp } from "../../apis/firestoreDataQueryFuncs"
function Homepage({ user }) {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState("add")
    const [uid, setUid] = useState(null)
    const [isVerified, setIsVerified] = useState(null)
    const [showCommentPage, setShowCommentPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [commentPost, setCommentPost] = useState({
        id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false
    })
    const [updateLike, setUpdateLike] = useState(null)

    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
            if (user.uid) { setUid(user.uid) }
            if (user.emailVerified) { setIsVerified(user.emailVerified) }
        }
    }, [user])



    const changePage = (page) => {
        setCurrentPage(page)
    }

    const handlePostClick = (post, isLiked = false) => {
        setShowCommentPage(!showCommentPage)
        setCommentPost({ ...post, isLiked })
    }

    const removeCommentsPage = (wrapperCommentsRef, e, force = false) => {
        console.log("REMOVING ");

        if (force) {
            setShowCommentPage(false)
            setTimeout(() => {
                setCommentPost({ id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false })
            }, 200)

        }
        else if (e.target == wrapperCommentsRef.current) {
            setShowCommentPage(false)
            setTimeout(() => {
                setCommentPost({ id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false })
            }, 200)


        }

    }

    const calLGetDp = async () => {
        const image = await getDp("userDp", uid)
        console.log("IMAGE: ", image);
    }

    const changePostLike = (postId, isLiked) => {
        setUpdateLike({ key: postId, val: isLiked })
        setCommentPost(prev => { return { ...prev, isLiked } })
    }

    const changeIsLoading = (val) => {
        setIsLoading(val)
    }


    return (
        <>
            <Navbar currentPage={currentPage} changePage={changePage} isLoading={isLoading} removeCommentsPage={removeCommentsPage} />

            <div className={`homepage ${showCommentPage ? "homepage-blur " : ""}`} >
                {currentPage === "home" && <Posts handlePostClick={handlePostClick} uid={uid} updateLike={updateLike} changeIsLoading={changeIsLoading} />}
                {currentPage === "add" && <AddPostPage uid={uid} changePage={changePage} isVerified={isVerified}
                />}
                {currentPage === "profile" && <ProfilePage uid={uid} changeIsLoading={changeIsLoading} handlePostClick={handlePostClick}
                    updateLike={updateLike} />}
            </div>

            <CommentsPage showCommentPage={showCommentPage} commentPost={commentPost} removeCommentsPage={removeCommentsPage}
                changePostLike={changePostLike} uid={uid} />
            {/* <button onClick={calLGetDp}>CLICK</button> */}
            {/* <button onClick={() => { setShowCommentPage(!showCommentPage) }}>Click</button> */}

        </>
    )
}

export default Homepage