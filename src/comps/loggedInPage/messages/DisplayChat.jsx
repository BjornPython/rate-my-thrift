import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { getUserInfo } from '../../../apis/firestoreUsersFuncs'

function DisplayChat({ uid, chatId, info, changeCurrentChat }) {

    const chatUserId = info.participants[0] == uid ? info.participants[1] : info.participants[0] // get other user's id.
    const [chatUserInfo, setChatUserInfo] = useState({ name: null, dpURL: null })
    const { name, dpURL } = chatUserInfo

    const [lastMsg, setLastMsg] = useState("")
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

    useEffect(() => {
        if (!info) { return }
        setLastMsg(info.lastMsg)
    }, [info])

    return (
        <div className="message-preview" onClick={() => { changeCurrentChat(true) }}>
            {dpURL ? <img src={dpURL} className="msg-icn" /> : <FontAwesomeIcon icon={faCircle} className="msg-icn" />}
            <div className="message-content">
                <h4>{name}</h4>
                <p>{lastMsg !== "" ? lastMsg : `message ${name}`}</p>
            </div>
        </div>
    )
}

export default DisplayChat