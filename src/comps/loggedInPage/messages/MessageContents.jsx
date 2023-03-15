import React, { useEffect, useMemo } from 'react'

import DisplayChat from './DisplayChat'



function MessageContents({ uid, sortedChats, chatInfo, currentChat, changeCurrentChat }) {


    const chatsMemo = useMemo(() => {
        return (
            sortedChats.map((chat) => {
                const { chatId } = chat
                return (
                    <DisplayChat key={chatId} uid={uid} chatId={chatId} info={chatInfo[chatId]} changeCurrentChat={changeCurrentChat} />
                )
            })
        )
    }, [sortedChats, chatInfo])

    return (
        <div className={`message-contents ${currentChat && "hide-chats"}`} >
            {chatsMemo}
        </div>
    )
}

export default MessageContents