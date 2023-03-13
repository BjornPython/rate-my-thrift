import React, { useState } from 'react'
import "../../../css/loggedIn/messages/messagePage.css"
import Chat from './Chat'
import MessageContents from './MessageContents'

function MessagePage({ uid, sortedChats, chatInfo }) {

    const [showMessages, setShowMessages] = useState(true)

    const [currentChat, setCurrentChat] = useState(null)

    const changeCurrentChat = (val) => {
        setCurrentChat(val)
    }

    return (
        <div className={`message-page ${showMessages && "message-page-show"}`}>

            {!currentChat &&

                <>
                    <div className="message-header" onClick={() => { setShowMessages(!showMessages) }} >
                        <h3>Messages</h3>
                    </div>



                    <MessageContents uid={uid} sortedChats={sortedChats} chatInfo={chatInfo} changeCurrentChat={changeCurrentChat} />


                </>
            }

            {currentChat && <Chat changeCurrentChat={changeCurrentChat} />}

        </div>
    )
}

export default MessagePage