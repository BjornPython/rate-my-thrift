import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import DisplayChat from './DisplayChat'



function MessageContents({ uid, sortedChats, chatInfo }) {
    return (
        <div className='message-contents'>
            {sortedChats.map((chat) => {
                const { chatId } = chat
                return (
                    <DisplayChat key={chatId} uid={uid} chatId={chatId} info={chatInfo[chatId]} />
                )
            })}
        </div>
    )
}

export default MessageContents