import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
function DisplayComment({ comment }) {
    const { content } = comment
    const [commentUserInfo, setCommentUserInfo] = useState({ email: "" })
    const { email } = commentUserInfo
    useEffect(() => {
        const callGetUserInfo = async () => {
            const userInfo = await getUserInfo(comment.userId);
            setCommentUserInfo(userInfo)
        }
        callGetUserInfo()
    }, [])


    return (
        < div className="comment-div" >
            <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
            <div className="name-comment">
                <p>{email}</p>
                <p>{content}</p>
            </div>
        </div >
    )
}

export default DisplayComment