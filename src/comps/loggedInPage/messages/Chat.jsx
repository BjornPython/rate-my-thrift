import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faMinus, faCircle } from "@fortawesome/free-solid-svg-icons"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useEffect, useState } from "react"
import { updateChatSeen } from '../../../apis/firestoreMessageFuncs'


function Chat({ uid, currentChat, changeCurrentChat, chatMessagesData,
    changeShowMessages, showMessages, info, updateProfilePreview }) {

    const chatUserId = info.participants[0] == uid ? info.participants[1] : info.participants[0]
    const [chatMessages, setChatMessages] = useState([])
    const [sendingMessages, setSendingMessages] = useState({})
    const [isSeen, setIsSeen] = useState(true)


    useEffect(() => {
        if (!currentChat) { return }
        setChatMessages(chatMessagesData[currentChat.chatId].messages)
    }, [chatMessagesData])

    useEffect(() => {
        console.log('CHAT MESSAGES: ', chatMessages);
    }, [chatMessages])


    useEffect(() => {
        if (!info) { return }
        if (info.seen_by.includes(uid)) { console.log("CHAT SEEN"); setIsSeen(true) } else { console.log("CHAT FALSE"); setIsSeen(false) }
    }, [info])

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




    return (
        <div className='chat-page' onClick={() => { if (!isSeen) { updateChatSeen(currentChat.chatId, uid) } }} >
            <div className={`chat-dp-name ${!showMessages && "min-chat"}`}
                onClick={() => { if (!showMessages) { changeShowMessages(true) } }}>

                {currentChat.dpURL
                    ?
                    <img src={currentChat.dpURL} alt="" className={`chat-dp ${!showMessages && "hide-chat-icns"}`}
                        onClick={() => { updateProfilePreview(chatUserId) }} />
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
            {!isSeen && <FontAwesomeIcon icon={faCircle} className="new-notif" />}
        </div>
    )
}

export default Chat