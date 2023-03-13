import "../../css/loggedIn/homepage.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "./Navbar"
import Posts from "./Posts"
import AddPostPage from "./AddPost/AddPostPage"
import CommentsPage from "./comments/CommentsPage"
import ProfilePage from "./profile/ProfilePage"
import { useNavigate, useParams } from "react-router-dom"
import MessagePage from "./messages/MessagePage"
import { chatsCollection, userChatsCollection } from "../../apis/firebase"
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore"

// default val of commentPost
const defaultCommentPost = { id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false, userId: "" }

function Homepage({ user }) {
    const navigate = useNavigate()
    const [showNotif, setShowNotif] = useState(false) // If notif window is shown
    const [currentPage, setCurrentPage] = useState("home") // which page to show
    const [uid, setUid] = useState(null) // the user's firebase uid
    const [isVerified, setIsVerified] = useState(null) // if the user is verified
    const [updateLike, setUpdateLike] = useState(null) // if like should be updated, used for liking post in commentsPage

    const [profilePreviewId, setProfilePreviewId] = useState(null) // The id of another user to display their profile.
    const [isLoading, setIsLoading] = useState(false) // if the homepage is loading. used to show the loading icn.

    const [showCommentPage, setShowCommentPage] = useState(false) // if comments Page is active
    const [commentPost, setCommentPost] = useState({
        id: "", imageUrls: "", title: "", caption: "", dateTime: "", isLiked: false, userId: ""
    })

    const [listeningChatIds, setListeningChatIds] = useState([])
    const [chatInfo, setChatInfo] = useState({}) // Store chat info {participants, seen, lastEdited}
    const [chatMessagesData, setChatMessagesData] = useState({}) // store chatMessagesData
    const [sortedChats, setSortedChats] = useState([]) // sorted chats by lastEdited


    useEffect(() => {
        // sets the initial user values when user logs in/ registers
        if (!user) {
            navigate("/")
        } else {
            if (user.uid && user.uid !== uid) { setUid(user.uid) }
            if (user.emailVerified) { setIsVerified(user.emailVerified) }
        }
    }, [user])


    useEffect(() => {
        if (!uid) { return }
        // Listen to userChatIds changes
        const getUserChatIds = async () => {
            const docRef = doc(userChatsCollection, user.uid)

            const unsub = onSnapshot(docRef, (changedDoc) => {
                const chatIds = changedDoc.data().chatIds
                // listen to user's chatIds
                chatIds.forEach((chatId) => {

                    // check if already listening to chatId  
                    if (!listeningChatIds.includes(chatId)) {

                        // Listen to changes of chat Id document
                        const chatRef = doc(chatsCollection, chatId)
                        const chatListener = onSnapshot(chatRef, (chatDoc) => {
                            setChatInfo(prevState => { return { ...prevState, [chatId]: chatDoc.data() } })
                        })

                        // Listen to message documents of chat Id
                        const chatMessagesRef = collection(chatsCollection, chatId, "messages")
                        const q = query(chatMessagesRef)
                        const chatMessagesListener = onSnapshot(q, (res) => {
                            if (res.docs) {
                                setChatMessagesData(prevConts => {
                                    return { ...prevConts, [chatId]: { ...prevConts[chatId], messages: res.docs } }
                                })
                            }
                        })
                        setListeningChatIds(prevIds => { return [...prevIds, chatId] })


                    }
                })
            })

        }
        getUserChatIds()
    }, [uid])

    useEffect(() => {
        console.log("CHAT INFO: ", chatInfo);
        const toSortChats = Object.entries(chatInfo).map(info => {
            console.log("INFO: ", info);
            return { chatId: info[0], lastEdited: info[1].lastEdited }
        })

        toSortChats.sort(function (a, b) {
            const dateA = new Date(a.lastEdited)
            const dateB = new Date(b.lastEdited)
            return dateA - dateB
        })
        console.log("SORTED: ", toSortChats);
        setSortedChats(toSortChats)

    }, [chatInfo])



    // shows another user's profile
    useEffect(() => {
        if (!profilePreviewId) { return }
        setCurrentPage("other-profile")
        setShowCommentPage(false)
    }, [profilePreviewId])





    // function used to change page.
    const changePage = (page) => {
        setCurrentPage(page)
    }

    // shows the comments page when a post is clicked
    const handlePostClick = (post, isLiked = false) => {
        setShowCommentPage(!showCommentPage)
        setCommentPost({ ...post, isLiked })
    }


    // removes comment page depending on conditions
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

    // changes the displayed post on comments page.
    const changeCommentPost = (val) => {
        setCommentPost(prevState => { return { ...prevState, ...val } })
        if (!showCommentPage) { setShowCommentPage(true) }
    }

    // used to update whether a post is liked or not from the comments page
    const changePostLike = (postId, isLiked) => {
        setUpdateLike({ key: postId, val: isLiked })
        setCommentPost(prev => { return { ...prev, isLiked } })
    }


    // used to update if the page is loading
    const changeIsLoading = (val) => {
        setIsLoading(val)
    }

    // removes the profile preview of another user
    const removeProfilePreview = () => {
        setProfilePreviewId(null)

    }

    // updates the profile preview of another user
    const updateProfilePreview = (id) => {
        if (id === uid) { setCurrentPage("profile"); removeCommentsPage(null, null, true) }
        if (id === profilePreviewId) { removeCommentsPage(null, null, true) }
        else { console.log("setting profil id to : ", id); setProfilePreviewId(id) }
    }

    // used to change value of showNotif
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

            <MessagePage uid={uid} sortedChats={sortedChats} chatInfo={chatInfo} chatMessagesData={chatMessagesData} />
        </>
    )
}

export default Homepage