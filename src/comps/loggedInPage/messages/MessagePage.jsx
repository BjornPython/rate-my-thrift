import React, { useState } from 'react'
import "../../../css/loggedIn/messages/messagePage.css"
import Chat from './Chat'
import MessageContents from './MessageContents'

function MessagePage({ uid, sortedChats, chatInfo, chatMessagesData }) {

    const [showMessages, setShowMessages] = useState(true)

    const [currentChat, setCurrentChat] = useState(null)

    const changeCurrentChat = (val) => {
        setCurrentChat(val)
    }


    return (
        <div className={`message-page ${showMessages && "message-page-show"}`}>

            {!currentChat &&

                <div className={`message-header ${showMessages && "message-header-active"}`} onClick={() => { setShowMessages(!showMessages) }} >
                    <h3>Messages</h3>
                </div>

            }

            <MessageContents uid={uid} sortedChats={sortedChats} chatInfo={chatInfo} currentChat={currentChat} changeCurrentChat={changeCurrentChat} />

            {currentChat && <Chat uid={uid} currentChat={currentChat} changeCurrentChat={changeCurrentChat} chatMessagesData={chatMessagesData} />}

        </div>
    )
}

export default MessagePage