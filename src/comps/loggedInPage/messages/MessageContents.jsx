import React from 'react'

import DisplayChat from './DisplayChat'



function MessageContents({ uid, sortedChats, chatInfo, changeCurrentChat }) {
    return (
        <div className='message-contents'>
            {sortedChats.map((chat) => {
                const { chatId } = chat
                return (
                    <DisplayChat key={chatId} uid={uid} chatId={chatId} info={chatInfo[chatId]} changeCurrentChat={changeCurrentChat} />
                )


            })}
        </div>
    )
}

export default MessageContents