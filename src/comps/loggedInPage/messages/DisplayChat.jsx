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
            console.log("QUERYING");
            const info = await getUserInfo(chatUserId)
            if (info) { setChatUserInfo(info) }
        }
        queryChatUserInfo()
    }, [uid])

    useEffect(() => {
        if (!name) { return }
    }, [chatUserInfo])

    useEffect(() => {
        if (!info) { return }
        setLastMsg(info.lastMsg)
    }, [info])

    return (
        <div className="message-preview" onClick={() => { console.log("NAME: ", name); changeCurrentChat({ chatId, name, dpURL }) }}>
            {dpURL ? <img src={dpURL} className="msg-icn" /> : <FontAwesomeIcon icon={faCircle} className="msg-icn" />}
            <div className="message-content">
                <h4>{name ? name : "Name"}</h4>
                <p>{lastMsg !== "" ? lastMsg : `message ${name}`}</p>
            </div>
        </div>
    )
}

export default DisplayChat