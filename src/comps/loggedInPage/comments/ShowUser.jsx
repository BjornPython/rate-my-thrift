import { faCircle, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"

function ShowUser({ userId, updateProfilePreview }) {
    const [userDp, setUserDp] = useState(null)
    const [userNameBio, setUserNameBio] = useState({ name: "", bio: "" })
    const { name, bio } = userNameBio
    useEffect(() => {
        setUserDp(null)
        const userInfo = async () => {
            if (!userId) { return }
            const info = await getUserInfo(userId)
            if (info) {
                setUserDp(info.dpURL)
                setUserNameBio(prevState => {
                    return { ...prevState, name: info.name, bio: info.bio }
                })
            }
        }
        userInfo()
    }, [userId])


    return (
        <div className="comments-user" >
            {userDp
                ?
                <img src={userDp} className="post-user-img" onClick={() => { updateProfilePreview(userId) }} />
                :
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" onClick={() => { updateProfilePreview(userId) }} />
            }

            <div className="name-bio" onClick={() => { updateProfilePreview(userId) }}>
                <p>{name}</p>
                <p>{bio}</p>
            </div>

            <FontAwesomeIcon icon={faMessage} className="cmnt-msg-user" />
        </div>
    )
}

export default ShowUser