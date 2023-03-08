import "../../css/loggedIn/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHouse, faUser, faBell, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { logout } from "../../apis/firebase"
import { useState } from "react"
import { useEffect } from "react"
import Notifications from "./notifications/Notifications"

function Navbar({ uid, changePage, isLoading, removeCommentsPage }) {

    const [iscollapsed, setIsCollapsed] = useState(false)
    const [showNotif, setShowNotif] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const checkScreenWidth = () => {
        if (window.innerWidth >= 720) { setIsCollapsed(false) }
        if (window.innerWidth <= 720) { setIsCollapsed(true) }
        if (window.innerWidth <= 400) { setIsCollapsed(true) }
    }

    useEffect(() => {
        const handleWindowResize = () => {
            checkScreenWidth()
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    useEffect(() => {
        checkScreenWidth()
    }, [])

    return (
        <div className="navbar">

            <div className="navbar-contents">
                {!iscollapsed && <h1 className="logo">Rate my Thrifts</h1>}


                <div className="navbar-pages">
                    <div className="navbar-icon" onClick={(e) => { changePage("home"); removeCommentsPage(null, null, true, true) }}><FontAwesomeIcon icon={faHouse} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={(e) => { changePage("add"); removeCommentsPage(null, null, true, true) }}><FontAwesomeIcon icon={faCirclePlus} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={(e) => { changePage("profile"); removeCommentsPage(null, null, true, true) }} ><FontAwesomeIcon icon={faUser} className="navbar-icns" /></div>
                    <div className="navbar-icon" id="notif-icn" >
                        <FontAwesomeIcon icon={faBell} className="navbar-icns" onClick={() => { setShowNotif(!showNotif) }} />
                        {showNotif && <Notifications uid={uid} />}
                    </div>
                </div>

                {!iscollapsed
                    ?
                    <p className="navbar-icns out-icn" onClick={() => { setShowLogout(!showLogout) }} style={{ right: "50px" }} >Logout</p>
                    :
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icns out-icn" onClick={logout} style={{ right: "20px", width: "16px" }} />
                }

                <div className={`logout-div ${showLogout && "show-logout"}`} >
                    <p >confirm Logout ?</p>
                    <div className="logout-btns">
                        <button onClick={logout}>Logout</button>
                        <button onClick={() => { setShowLogout(false) }}>cancel</button>
                    </div>

                </div>
            </div>
            <div className="nav-relative">
                <span className={`loading-icn ${isLoading && "loading-icn-50"}`}> <p className="hide"></p></span>
            </div>


        </div>
    )
}
// loading-icn-50 loading-icn-100
export default Navbar