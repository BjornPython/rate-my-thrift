import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faMinus, faCircle } from "@fortawesome/free-solid-svg-icons"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useEffect, useState } from "react"

function Chat({ uid, currentChat, changeCurrentChat, chatMessagesData, changeShowMessages, showMessages }) {

    const [chatMessages, setChatMessages] = useState([])
    const [sendingMessages, setSendingMessages] = useState({})

    useEffect(() => {
        if (!currentChat) { return }
        setChatMessages(chatMessagesData[currentChat.chatId].messages)
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
        console.log("CURRENT CHAT: ", currentChat);
    }, [currentChat])

    return (
        <div className='chat-page'>
            <div className={`chat-dp-name ${!showMessages && "min-chat"}`}
                onClick={() => { if (!showMessages) { changeShowMessages(true) } }}>

                {currentChat.dpURL
                    ?
                    <img src={currentChat.dpURL} alt="" className={`chat-dp ${!showMessages && "hide-chat-icns"}`} />
                    :
                    <FontAwesomeIcon icon={faCircle} className={`chat-dp ${!showMessages && "hide-chat-icns"}`} />
                }
                <h4 className={`${!showMessages && "chat-name"}`}>
                    {currentChat.name ? currentChat.name : "..."}
                </h4>

                <FontAwesomeIcon icon={faMinus}
                    className={`hide-icn ${!showMessages && "hide-chat-icns"}`}
                    onClick={() => { changeShowMessages(null) }} />

                <FontAwesomeIcon icon={faX}
                    className={`ex-icn ${!showMessages && "hide-chat-icns"}`}
                    onClick={() => { changeCurrentChat(false); }} />

            </div>
            <Messages uid={uid} chatMessages={chatMessages} sendingMessages={sendingMessages} />
            <MessageInput uid={uid} currentChat={currentChat} addSendingMessages={addSendingMessages} deleteSendingMessages={deleteSendingMessages} />
        </div>
    )
}

export default Chat