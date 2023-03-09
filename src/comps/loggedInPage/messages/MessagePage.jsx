import React, { useState } from 'react'
import "../../../css/loggedIn/messages/messagePage.css"
import MessageContents from './MessageContents'
function MessagePage() {

    const [showMessages, setShowMessages] = useState(false)


    return (
        <div className={`message-page ${showMessages && "message-page-show"}`}>
            <div className="message-header" onClick={() => { setShowMessages(!showMessages) }} >
                <h3>Messages</h3>
            </div>
            <MessageContents />
        </div>
    )
}

export default MessagePage