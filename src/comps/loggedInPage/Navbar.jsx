import "../../css/loggedIn/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHouse, faUser, faBell, faArrowRightFromBracket, faCircle } from "@fortawesome/free-solid-svg-icons"
import { logout } from "../../apis/firebase"
import { useState } from "react"
import { useEffect } from "react"
import Notifications from "./notifications/Notifications"
import { notifCollection } from "../../apis/firebase"
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { updateNotifSeen, getNotifs } from "../../apis/firestoreDataQueryFuncs"
import { addUserChat, addMessage } from "../../apis/firestoreMessageFuncs"

function Navbar({ uid, changePage, isLoading, removeCommentsPage, showNotif, changeShowNotif, changeCommentPost }) {

    // const [showNotif, setShowNotif] = useState(false)
    const [newNotif, setNewNotif] = useState(null)
    const [showLogout, setShowLogout] = useState(false)

    const [notifs, setNotifs] = useState([])


    useEffect(() => {
        if (!uid) { return }

        const listenNotifs = async () => {
            const notifRef = collection(notifCollection, uid, "allNotifications");
            const q = query(notifRef, orderBy("dateTime", "desc"))
            const unsub = onSnapshot(q, (collection) => {
                setNotifs(collection.docs)
            })
        }

        const listenNotifSeen = async () => {
            const notifRef = doc(notifCollection, uid);
            const notifSeenListener = onSnapshot(notifRef, (doc) => {
                setNewNotif(!doc.data().seen)
            })
        }

        listenNotifs()
        listenNotifSeen()

    }, [uid])

    useEffect(() => {
        console.log("CURRENT SHOW NOTIF: ", showNotif);
    }, [showNotif])

    return (
        <div className="navbar">

            <div className="navbar-contents">
                <h1 className="logo">Rate my Thrifts</h1>


                <div className="navbar-pages">
                    <div className="navbar-icon" onClick={(e) => { changePage("home"); removeCommentsPage(null, null, true, true) }}><FontAwesomeIcon icon={faHouse} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={(e) => { changePage("add"); removeCommentsPage(null, null, true, true) }}><FontAwesomeIcon icon={faCirclePlus} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={(e) => { changePage("profile"); removeCommentsPage(null, null, true, true) }} ><FontAwesomeIcon icon={faUser} className="navbar-icns" /></div>
                    <div className="navbar-icon" id="notif-icn"   >
                        <FontAwesomeIcon icon={faBell} className="navbar-icns" onClick={
                            () => { changeShowNotif(!showNotif); if (newNotif) { updateNotifSeen(uid, true) } }} />
                        <Notifications uid={uid} notifs={notifs} showNotif={showNotif} changeCommentPost={changeCommentPost} />
                        {newNotif && !showNotif && <FontAwesomeIcon icon={faCircle} className="new-notif" />}
                    </div>
                </div>


                <FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icns out-icn"
                    onClick={() => { setShowLogout(!showLogout) }} style={{ right: "20px", width: "16px" }} />

                <div className={`logout-div ${showLogout && "show-logout"}`} >
                    <p >Confirm Logout ?</p>
                    <div className="logout-btns">
                        <button onClick={logout}>Logout</button>
                        <button onClick={() => { setShowLogout(false) }}>Cancel</button>
                    </div>

                </div>
            </div>
            <div className="nav-relative">
                <span className={`loading-icn ${isLoading && "loading-icn-50"}`}> <p className="hide"></p></span>
            </div>
            {/* <button onClick={async () => {
                addUserChat("kiW7VcRf77UIWQ5NKKnWb5XxOoT2", "ryTX8zHk3ZhfuUDkV2SPysz8Zh02")
            }}>ADD CHAT</button>
            <button onClick={async () => {
                addMessage("test", uid, "new message")
            }}>ADD MSG</button> */}
        </div>
    )
}
// loading-icn-50 loading-icn-100
export default Navbar