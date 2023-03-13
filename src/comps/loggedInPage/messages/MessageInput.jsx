import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { addMessage } from "../../../apis/firestoreMessageFuncs"
import uuid from "react-uuid"
function MessageInput({ uid, currentChat, addSendingMessages, deleteSendingMessages }) {

    const [message, setMessage] = useState("")

    const handleMsgChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        const msgId = uuid()
        addSendingMessages(msgId, message)
        const success = await addMessage(currentChat.chatId, uid, message)
        setMessage("")
        if (success) {
            deleteSendingMessages(msgId)
        }
    }




    return (
        <div className="message-input">
            <input type="text" name="msg" value={message} onChange={handleMsgChange} />
            <FontAwesomeIcon icon={faPaperPlane} className="msg-send-icn" onClick={sendMessage} />
        </div>
    )
}

export default MessageInput