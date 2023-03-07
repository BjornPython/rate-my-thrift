import { useState, useEffect } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
function DisplayComment({ comment, updateProfilePreview }) {
    const { content } = comment
    const [commentUserInfo, setCommentUserInfo] = useState({ name: "", email: "", dpURL: "" })
    const { name, email, dpURL } = commentUserInfo
    useEffect(() => {
        if (!comment.userId) { return }
        const callGetUserInfo = async () => {
            const userInfo = await getUserInfo(comment.userId);
            setCommentUserInfo(userInfo)
        }
        callGetUserInfo()
    }, [comment])


    return (
        < div className="comment-div" >
            {/* <FontAwesomeIcon icon={faCircle} className="comment-user-icn" /> */}
            <img src={dpURL} className="comment-dp" onClick={() => { updateProfilePreview(comment.userId) }} />
            <div className="name-comment"  >
                <p>{name}</p>
                <p>{content}</p>
            </div>
        </div >
    )
}

export default DisplayComment