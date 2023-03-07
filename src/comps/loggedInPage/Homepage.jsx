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

const defaultCommentPost = { id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false, userId: "" }

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


    const changePage = (page) => {
        setCurrentPage(page)
    }

    const handlePostClick = (post, isLiked = false) => {
        console.log("POST CLICKED");
        setShowCommentPage(!showCommentPage)
        setCommentPost({ ...post, isLiked })
    }

    const removeCommentsPage = (wrapperCommentsRef, e, force = false, removeProfilePreview = false) => {
        if (removeProfilePreview) { removeProfilePreview() }

        else if (force) {
            setShowCommentPage(false)
            setTimeout(() => {
                console.log("SETTING TO DEFAULT");
                setCommentPost(defaultCommentPost)
            }, 200)

        }
        else if (e.target == wrapperCommentsRef.current) {

            setShowCommentPage(false)
            setTimeout(() => {
                console.log("SETTING TO DEFAULT");
                setCommentPost(defaultCommentPost)
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

    const removeProfilePreview = () => {
        setTimeout(() => {
            setProfilePreviewId(null)
        }, 200)

    }

    const updateProfilePreview = (id) => {
        if (id === uid) { setCurrentPage("profile"); removeCommentsPage(null, null, true) }
        if (id === profilePreviewId) { removeCommentsPage(null, null, true) }
        else { console.log("setting profil id to : ", id); setProfilePreviewId(id) }
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
                    updateLike={updateLike} startKey="user" />}
                {currentPage === "other-profile" && <ProfilePage uid={profilePreviewId} changeIsLoading={changeIsLoading} handlePostClick={handlePostClick}
                    updateLike={updateLike} startKey="other" />}
            </div>
            <CommentsPage showCommentPage={showCommentPage} commentPost={commentPost} removeCommentsPage={removeCommentsPage}
                changePostLike={changePostLike} uid={uid} updateProfilePreview={updateProfilePreview} />

        </>
    )
}

export default Homepage