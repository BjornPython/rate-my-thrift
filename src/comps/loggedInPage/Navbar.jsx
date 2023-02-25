import "../../css/loggedIn/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHouse, faUser, faBars } from "@fortawesome/free-solid-svg-icons"
import { logout } from "../../firebase"


function Navbar({ changePage }) {
    return (
        <div className="navbar">
            <div className="navbar-contents">
                <h1 className="logo">Rate my Thrifts</h1>
                <div className="navbar-pages">
                    <div className="navbar-icon" onClick={() => { changePage("home") }}><FontAwesomeIcon icon={faHouse} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={() => { changePage("add") }}><FontAwesomeIcon icon={faCirclePlus} className="navbar-icns" /></div>
                    <div className="navbar-icon" onClick={() => { changePage("") }} ><FontAwesomeIcon icon={faUser} className="navbar-icns" /></div>
                </div>

                <FontAwesomeIcon icon={faBars} className="navbar-icns bar-icn" onClick={logout} />
            </div>
        </div>
    )
}

export default Navbar