import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"

function ShowUser({ userId }) {
    const [userDp, setUserDp] = useState(null)
    const [userNameBio, setUserNameBio] = useState({ name: "", bio: "" })
    const { name, bio } = userNameBio
    useEffect(() => {
        const userInfo = async () => {
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
        <div className="comments-user">
            {userDp
                ?
                <img src={userDp} className="post-user-img" />

                :
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
            }

            <div className="name-bio">
                <p>{name}</p>
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default ShowUser