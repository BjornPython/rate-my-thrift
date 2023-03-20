import { useState } from 'react'
import { auth } from '../../../apis/firebase'
import { sendEmailVerification } from 'firebase/auth'

function AddPostPopup({ isVerified, changePage, changeShowUpload }) {

    const [sentEmailVerification, setSentEmailVerification] = useState("Send email Verification")

    if (isVerified) {
        return (
            <div className="upload-popup">
                <h1>SUCCESFULLY <br></br> UPLOADED POST.</h1>
                <div className="popup-btns">
                    <button onClick={() => { changeShowUpload(true) }}>Upload again</button>
                    <button onClick={() => { changePage("home") }} >Back to homepage</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="upload-popup">
                <h1>PLEASE VERIFY ACCOUNT <br></br> TO UPLOAD POST.</h1>
                <div className="popup-btns">
                    <button onClick={() => { sendEmailVerification(auth.currentUser); setSentEmailVerification("Email Verification Sent!") }} >{sentEmailVerification}</button>
                    <button onClick={() => { changePage("home") }} >Back to homepage</button>
                </div>
            </div>
        )
    }
}

export default AddPostPopup