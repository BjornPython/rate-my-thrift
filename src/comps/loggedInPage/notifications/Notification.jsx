import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

function Notification() {
    return (
        <div className='notif'>
            <FontAwesomeIcon icon={faCircle} className="comment-dp" />
            <h4>Someone liked your comment</h4>
        </div>
    )
}

export default Notification