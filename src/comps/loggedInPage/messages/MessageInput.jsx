import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { addMessage } from "../../../apis/firestoreMessageFuncs"

function MessageInput({ uid, currentChat }) {

    const [message, setMessage] = useState("")
    const handleMsgChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        await addMessage(currentChat, uid, message)
        if (addMessage) { setMessage("") }
    }


    return (
        <div className="message-input">
            <input type="text" name="msg" value={message} onChange={handleMsgChange} />
            <FontAwesomeIcon icon={faPaperPlane} className="msg-send-icn" onClick={sendMessage} />
        </div>
    )
}

export default MessageInput