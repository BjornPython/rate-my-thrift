import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
function MessageInput() {
    return (
        <div className="message-input">
            <input type="text" />
            <FontAwesomeIcon icon={faPaperPlane} className="msg-send-icn" />
        </div>
    )
}

export default MessageInput