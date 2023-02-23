import "../../css/loggedIn/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHouse, faUser, faBars } from "@fortawesome/free-solid-svg-icons"


function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-contents">

                <div className="navbar-pages">
                    <div className="navbar-icon"><FontAwesomeIcon icon={faHouse} className="navbar-icns" /></div>
                    <div className="navbar-icon"><FontAwesomeIcon icon={faCirclePlus} className="navbar-icns" /></div>
                    <div className="navbar-icon"><FontAwesomeIcon icon={faUser} className="navbar-icns" /></div>
                </div>

                <FontAwesomeIcon icon={faBars} className="navbar-icns bar-icn" />
            </div>
        </div>
    )
}

export default Navbar