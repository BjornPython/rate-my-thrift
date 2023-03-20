import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { getUserInfo } from '../../../apis/firestoreUsersFuncs'
import { updateChatSeen } from '../../../apis/firestoreMessageFuncs'
function DisplayChat({ uid, chatId, info, changeCurrentChat }) {

    const chatUserId = info.participants[0] == uid ? info.participants[1] : info.participants[0] // get other user's id.
    const [chatUserInfo, setChatUserInfo] = useState({ name: null, dpURL: null })
    const [isSeen, setIsSeen] = useState(true)
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
        if (!info) { return }
        console.log("INFO: ", info);
        setLastMsg(info.lastMsg)
        if (info.seen_by.includes(uid)) { console.log("SEEN IS TRUE"); setIsSeen(true) } else { console.log("SEEN IS FALSE"); setIsSeen(false) }
    }, [info])

    return (
        <div className="message-preview" onClick={() => { changeCurrentChat({ chatId, name, dpURL }); if (!isSeen) { updateChatSeen(chatId, uid) } }}>
            {dpURL ? <img src={dpURL} className="msg-icn" /> : <FontAwesomeIcon icon={faCircle} className="msg-icn" />}
            <div className="message-content">
                <h4>{name ? name : "Name"}</h4>
                <p className={`${!isSeen && "focus-msg"}`}>{lastMsg !== "" ? lastMsg : `message ${name}`}</p>
            </div>
        </div>
    )
}

export default DisplayChat