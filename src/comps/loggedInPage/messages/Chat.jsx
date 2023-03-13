import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faCircle } from "@fortawesome/free-solid-svg-icons"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useEffect, useState } from "react"

function Chat({ uid, currentChat, changeCurrentChat, chatMessagesData }) {

    const [chatMessages, setChatMessages] = useState([])
    const [sendingMessages, setSendingMessages] = useState({})

    useEffect(() => {
        if (!currentChat) { return }
        setChatMessages(chatMessagesData[currentChat].messages)
    }, [chatMessagesData])

    useEffect(() => {
        console.log('CHAT MESSAGES: ', chatMessages);
    }, [chatMessages])

    const addSendingMessages = (msgId, message) => {
        setSendingMessages(prevState => { return { ...prevState, [msgId]: message } })
    }

    const deleteSendingMessages = (msgId) => {
        setSendingMessages(prevState => {
            const newState = { ...prevState }
            delete newState[msgId]
            return newState
        })
    }

    useEffect(() => {
        console.log("SENDING MESSAGES: ", sendingMessages);
    }, [sendingMessages])

    return (
        <div className='chat-page'>
            <div className="chat-dp-name">
                <FontAwesomeIcon icon={faCircle} className="chat-dp" />
                <h4>Nathan Flores</h4>
                <FontAwesomeIcon icon={faX} className="ex-icn" onClick={() => { changeCurrentChat(null) }} />
            </div>
            <Messages uid={uid} chatMessages={chatMessages} sendingMessages={sendingMessages} />
            <MessageInput uid={uid} currentChat={currentChat} addSendingMessages={addSendingMessages} deleteSendingMessages={deleteSendingMessages} />
        </div>
    )
}

export default Chat