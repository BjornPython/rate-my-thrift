import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function ShowUser({ commentUserId }) {
    return (
        <div className="comments-user">
            <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
        </div>
    )
}

export default ShowUser