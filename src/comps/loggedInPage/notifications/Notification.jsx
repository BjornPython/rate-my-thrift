import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
import { getPost } from "../../../apis/firestoreDataQueryFuncs"

function Notification({ notif, changeCommentPost }) {

    const { type, initiatorId, dateTime, postId } = notif

    const [initiatorInfo, setInitiatorInfo] = useState({ name: "", dpURL: null })

    const { name, dpURL } = initiatorInfo
    const [postInfo, setPostInfo] = useState(null)


    useEffect(() => {
        const getInfo = async () => {
            const info = await getUserInfo(initiatorId)
            setInitiatorInfo(info)
        }
        getInfo()
    }, [])

    const handleNotifClick = async () => {
        const info = await getPost(postId)
        setPostInfo(info)

    }

    useEffect(() => {
        if (!postInfo) { return }
        console.log("POST INFO: ", postInfo);
        changeCommentPost(postInfo)
    }, [postInfo])

    return (
        <div className='notif' onClick={handleNotifClick}>
            {dpURL
                ?
                <img src={dpURL} className="comment-dp notif-img" />

                :
                <FontAwesomeIcon icon={faCircle} className="comment-dp notif-img" />}

            <div className="notif-content">
                <h4>{name} {type} your Post</h4>
                <p>feb 20, 2022</p>
            </div>

        </div>
    )
}

export default Notification