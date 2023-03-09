import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import CommentsPage from "./comments/CommentsPage"
import ProfilePage from "./profile/ProfilePage"
import { useNavigate, useParams } from "react-router-dom"
import OtherProfile from "./otherProfile/OtherProfile"
import MessagePage from "./messages/MessagePage"


const defaultCommentPost = { id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false, userId: "" }

function Homepage({ user }) {
    const navigate = useNavigate()
    const [showNotif, setShowNotif] = useState(false)
    const [currentPage, setCurrentPage] = useState("home")
    const [uid, setUid] = useState(null)
    const [isVerified, setIsVerified] = useState(null)
    const [updateLike, setUpdateLike] = useState(null)

    const [profilePreviewId, setProfilePreviewId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [showCommentPage, setShowCommentPage] = useState(false)
    const [commentPost, setCommentPost] = useState({
        id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false, userId: ""
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
        console.log("NEW ID: ", profilePreviewId);
        setCurrentPage("other-profile")
        setShowCommentPage(false)
    }, [profilePreviewId])

    useEffect(() => {
        console.log(commentPost);
    }, [commentPost])

    const changePage = (page) => {
        setCurrentPage(page)
    }

    const handlePostClick = (post, isLiked = false) => {
        setShowCommentPage(!showCommentPage)
        setCommentPost({ ...post, isLiked })
    }

    const removeCommentsPage = (wrapperCommentsRef, e, force = false, alsoRemoveProfilePreview = false) => {
        if (alsoRemoveProfilePreview) { removeProfilePreview() }
        else if (force) {
            setShowCommentPage(false)
            setTimeout(() => {
                setCommentPost(defaultCommentPost)
            }, 200)
        }
        else if (e.target == wrapperCommentsRef.current) {
            setShowCommentPage(false)
            setTimeout(() => {
                setCommentPost(defaultCommentPost)
            }, 200)
        }
    }

    const changeCommentPost = (val) => {
        setCommentPost(prevState => { return { ...prevState, ...val } })
        if (!showCommentPage) { setShowCommentPage(true) }
    }


    const changePostLike = (postId, isLiked) => {
        setUpdateLike({ key: postId, val: isLiked })
        setCommentPost(prev => { return { ...prev, isLiked } })
    }

    const changeIsLoading = (val) => {
        setIsLoading(val)
    }

    const removeProfilePreview = () => {
        setProfilePreviewId(null)

    }

    const updateProfilePreview = (id) => {
        if (id === uid) { setCurrentPage("profile"); removeCommentsPage(null, null, true) }
        if (id === profilePreviewId) { removeCommentsPage(null, null, true) }
        else { console.log("setting profil id to : ", id); setProfilePreviewId(id) }
    }

    const changeShowNotif = (val) => {
        setShowNotif(val)
    }
    return (
        <>
            <Navbar uid={uid} currentPage={currentPage} changePage={changePage} isLoading={isLoading} removeCommentsPage={removeCommentsPage}
                showNotif={showNotif} changeShowNotif={changeShowNotif} changeCommentPost={changeCommentPost} />

            <div className={`homepage ${showCommentPage ? "homepage-blur " : ""}`} onClick={() => { changeShowNotif(false) }} >
                {currentPage === "home" && <Posts handlePostClick={handlePostClick} uid={uid} updateLike={updateLike}
                    changeIsLoading={changeIsLoading} />}
                {currentPage === "add" && <AddPostPage uid={uid} changePage={changePage} isVerified={isVerified}
                />}
                {currentPage === "profile" && <ProfilePage uid={uid} changeIsLoading={changeIsLoading} handlePostClick={handlePostClick}
                    updateLike={updateLike} startKey="user" />}
                {currentPage === "other-profile" && <ProfilePage uid={profilePreviewId} changeIsLoading={changeIsLoading} handlePostClick={handlePostClick}
                    updateLike={updateLike} startKey="other" diffUser={true} />}
            </div>
            <CommentsPage showCommentPage={showCommentPage} commentPost={commentPost} removeCommentsPage={removeCommentsPage}
                changePostLike={changePostLike} uid={uid} updateProfilePreview={updateProfilePreview} />

            <MessagePage />
        </>
    )
}

export default Homepage