import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import CommentsPage from "./comments/CommentsPage"
import ProfilePage from "./profile/ProfilePage"
import { useNavigate, useParams } from "react-router-dom"
import { getDp } from "../../apis/firestoreDataQueryFuncs"
import OtherProfile from "./otherProfile/OtherProfile"



function Homepage({ user }) {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState("home")
    const [uid, setUid] = useState(null)
    const [isVerified, setIsVerified] = useState(null)
    const [updateLike, setUpdateLike] = useState(null)

    const [showProfilePreview, setShowProfilePreview] = useState(false)
    const [profilePreviewId, setProfilePreviewId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [showCommentPage, setShowCommentPage] = useState(false)
    const [commentPost, setCommentPost] = useState({
        id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false
    })

    useEffect(() => {

        if (!user) {
            navigate("/")
        } else {
            if (user.uid) { setUid(user.uid) }
            if (user.emailVerified) { setIsVerified(user.emailVerified) }
        }
    }, [user])

    useEffect(() => {
        if (!profilePreviewId) { return }
        else if (showCommentPage) { removeCommentsPage(null, null, true) }
        setShowProfilePreview(true)
    }, [profilePreviewId])


    const changePage = (page) => {
        setCurrentPage(page)
    }

    const handlePostClick = (post, isLiked = false) => {
        setShowCommentPage(!showCommentPage)
        setCommentPost({ ...post, isLiked })
    }

    const removeCommentsPage = (wrapperCommentsRef, e, force = false) => {

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


    const changePostLike = (postId, isLiked) => {
        setUpdateLike({ key: postId, val: isLiked })
        setCommentPost(prev => { return { ...prev, isLiked } })
    }

    const changeIsLoading = (val) => {
        setIsLoading(val)
    }

    const removeProfilePreview = (outside, e, force = false) => {

        if (force) {
            setShowProfilePreview(false)
            setTimeout(() => {
                setProfilePreviewId(null)
            }, 200)
        }
        else if (e.target == outside.current) {
            setShowProfilePreview(false)
            setTimeout(() => {
                setProfilePreviewId(null)
            }, 200)
        }
    }

    const updateProfilePreview = (id) => {
        if (id === uid) { setCurrentPage("profile"); removeCommentsPage(null, null, true) }
        else { setProfilePreviewId(id) }

    }

    return (
        <>
            <Navbar currentPage={currentPage} changePage={changePage} isLoading={isLoading} removeCommentsPage={removeCommentsPage} />

            <div className={`homepage ${showCommentPage || showProfilePreview ? "homepage-blur " : ""}`} >
                {currentPage === "home" && <Posts handlePostClick={handlePostClick} uid={uid} updateLike={updateLike}
                    changeIsLoading={changeIsLoading} />}
                {currentPage === "add" && <AddPostPage uid={uid} changePage={changePage} isVerified={isVerified}
                />}
                {currentPage === "profile" && <ProfilePage uid={uid} changeIsLoading={changeIsLoading} handlePostClick={handlePostClick}
                    updateLike={updateLike} />}
            </div>

            <CommentsPage showCommentPage={showCommentPage} commentPost={commentPost} removeCommentsPage={removeCommentsPage}
                changePostLike={changePostLike} uid={uid} updateProfilePreview={updateProfilePreview} />

            <OtherProfile showProfilePreview={showProfilePreview} profilePreviewId={profilePreviewId} removeProfilePreview={removeProfilePreview} />

        </>
    )
}

export default Homepage