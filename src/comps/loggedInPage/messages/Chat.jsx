import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faCircle } from "@fortawesome/free-solid-svg-icons"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

function Chat({ changeCurrentChat }) {


    return (
        <div className='chat-page'>
            <div className="chat-dp-name">
                <FontAwesomeIcon icon={faCircle} className="chat-dp" />
                <h4>Nathan Flores</h4>
                <FontAwesomeIcon icon={faX} className="ex-icn" onClick={() => { changeCurrentChat(null) }} />
            </div>
            <Messages />
            <MessageInput />
        </div>
    )
}

export default Chat