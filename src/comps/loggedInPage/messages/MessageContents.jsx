import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'




function MessageContents({ sortedChats, chatInfo }) {
    return (
        <div className='message-contents'>
            {console.log("MAPPING.... sorted chats: ", sortedChats)}
            {sortedChats.map((chat) => {
                console.log("MAPPING.... 2");
                const { chatId } = chat
                return (
                    <div className="message-preview">
                        <FontAwesomeIcon icon={faCircle} className="msg-icn" />
                        <div className="message-content">
                            <h4>{chatInfo[chatId].participants[0]}</h4>
                            <p>Your last message...</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageContents