import { useRef } from "react"
import "../../../css/loggedIn/otherProfile/otherProfile.css"

function OtherProfile({ showProfilePreview, profilePreviewId, removeProfilePreview }) {

    const outsideRef = useRef(null)

    return (
        <div ref={outsideRef}
            className={`other-profile-page ${showProfilePreview && "other-profile-page-show"}`}
            onClick={(e) => { removeProfilePreview(outsideRef, e) }}>
            <div className="other-preview">

            </div>
        </div>
    )
}

export default OtherProfile