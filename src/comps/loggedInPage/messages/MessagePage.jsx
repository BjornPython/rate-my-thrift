import React, { useState } from 'react'
import "../../../css/loggedIn/messages/messagePage.css"
import Chat from './Chat'
import MessageContents from './MessageContents'

function MessagePage({ sortedChats, chatInfo }) {

    const [showMessages, setShowMessages] = useState(true)


    return (
        <div className={`message-page ${showMessages && "message-page-show"}`}>
            <div className="message-header" onClick={() => { setShowMessages(!showMessages) }} >
                <h3>Messages</h3>
            </div>
            <MessageContents sortedChats={sortedChats} chatInfo={chatInfo} />
            {/* <Chat /> */}
        </div>
    )
}

export default MessagePage