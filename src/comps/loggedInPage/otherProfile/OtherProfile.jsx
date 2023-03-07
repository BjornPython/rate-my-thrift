import { useRef, useState, useEffect } from "react"
import "../../../css/loggedIn/otherProfile/otherProfile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
import UserPosts from "../profile/UserPosts"



function OtherProfile({
    showProfilePreview, profilePreviewId, removeProfilePreview,
    handlePostClick, updateLike, uid }) {

    const outsideRef = useRef(null)
    const [profilePreviewInfo, setProfilePreviewInfo] = useState(
        { name: "Nathan", bio: "just a bio", dpURL: null, posts: [] }
    )

    const { name, bio, dpURL, posts } = profilePreviewInfo

    useEffect(() => {
        if (!profilePreviewId) { return }
        const previewInfo = async () => {
            const info = await getUserInfo(profilePreviewId)
            setProfilePreviewInfo(info)
        }
        previewInfo()
    }, [profilePreviewId])


    return (
        <div ref={outsideRef}
            className={`other-profile-page ${showProfilePreview && "other-profile-page-show"}`}
            onClick={(e) => { removeProfilePreview(outsideRef, e) }}>
            <div className="other-preview">


                <div className="comments-page">
                    <div className="comments-contents" style={{ height: "560px" }}>
                        <div className="other-profile" style={{ marginBottom: "80px" }}>
                            {dpURL
                                ?
                                <img src={dpURL} className="post-user-img" />
                                :
                                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
                            }

                            <div className="name-bio" style={{ marginLeft: "20px" }}>
                                <p>{name}</p>
                                <p>{bio}</p>
                            </div>

                        </div>
                        <UserPosts handlePostClick={handlePostClick} updateLike={updateLike}
                            uid={profilePreviewId} startKey="other" />

                    </div>


                </div>
            </div>
        </div>
    )
}

export default OtherProfile