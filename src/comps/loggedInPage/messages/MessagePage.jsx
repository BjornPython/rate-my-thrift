import React, { useState } from 'react'
import "../../../css/loggedIn/messages/messagePage.css"
import Chat from './Chat'
import MessageContents from './MessageContents'

function MessagePage({
    uid, currentChat, changeCurrentChat, showMessages,
    changeShowMessages, sortedChats, chatInfo, chatMessagesData,
    updateProfilePreview }) {


    return (
        <div className={`message-page ${showMessages && "message-page-show"}`}>

            {!currentChat &&

                <div className={`message-header ${showMessages && "message-header-active"}`} onClick={() => { changeShowMessages(!showMessages) }} >
                    <h3>Messages</h3>
                </div>

            }

            <MessageContents uid={uid} sortedChats={sortedChats} chatInfo={chatInfo} currentChat={currentChat} changeCurrentChat={changeCurrentChat} />

            {currentChat && <Chat uid={uid} currentChat={currentChat} changeCurrentChat={changeCurrentChat} info={chatInfo[currentChat.chatId]}
                chatMessagesData={chatMessagesData} showMessages={showMessages} changeShowMessages={changeShowMessages} updateProfilePreview={updateProfilePreview} />}

        </div>
    )
}

export default MessagePage