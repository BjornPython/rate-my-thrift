import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function ShowUser({ commentUserId }) {
    return (
        <div className="comments-user">
            <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
            <div className="name-bio">
                <p>Nathan Flores</p>
                <p>This is a bio</p>
            </div>
        </div>
    )
}

export default ShowUser