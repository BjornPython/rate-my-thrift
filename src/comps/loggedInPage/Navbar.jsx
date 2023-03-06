import "../../css/loggedIn/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHouse, faUser, faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { logout } from "../../apis/firebase"
import { useState } from "react"
import { useEffect } from "react"

function Navbar({ changePage, isLoading }) {

    const [iscollapsed, setIsCollapsed] = useState(false)


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
                    <div className="navbar-icon" onClick={() => { changePage("home") }}><FontAwesomeIcon icon={faHouse} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={() => { changePage("add") }}><FontAwesomeIcon icon={faCirclePlus} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={() => { changePage("profile") }} ><FontAwesomeIcon icon={faUser} className="navbar-icns" /></div>
                </div>
                {!iscollapsed
                    ?
                    <p className="navbar-icns out-icn" onClick={logout} style={{ right: "50px" }} >logout</p>
                    :
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icns out-icn" onClick={logout} style={{ right: "20px", width: "16px" }} />
                }

            </div>
            <div className="nav-relative">
                <span className={`loading-icn ${isLoading && "loading-icn-50"}`}> <p className="hide"></p></span>
            </div>
        </div>
    )
}
// loading-icn-50 loading-icn-100
export default Navbar