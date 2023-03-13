import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { getUserInfo } from '../../../apis/firestoreUsersFuncs'

function DisplayChat({ uid, chatId, info }) {

    const chatUserId = info.participants[0] == uid ? info.participants[1] : info.participants[0] // get other user's id.

    const [chatUserInfo, setChatUserInfo] = useState({ name: null, dpURL: null })
    const { name, dpURL } = chatUserInfo

    useEffect(() => {
        const queryChatUserInfo = async () => {
            const info = await getUserInfo(chatUserId)
            setChatUserInfo(info)
        }
        queryChatUserInfo()
    }, [chatUserId])

    useEffect(() => {
        if (!name) { return }
        console.log("CHAT U INFO: ", chatUserInfo);
    }, [chatUserInfo])

    return (
        <div className="message-preview">
            {dpURL ? <img src={dpURL} className="msg-icn" /> : <FontAwesomeIcon icon={faCircle} className="msg-icn" />}
            <div className="message-content">
                <h4>{name}</h4>
                <p>Your last message...</p>
            </div>
        </div>
    )
}

export default DisplayChat