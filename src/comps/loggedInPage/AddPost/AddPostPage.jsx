import { useState, useEffect } from 'react'
import UploadPost from './UploadPost'
import AddPostPopup from './AddPostPopup'



function AddPostPage({ uid, changePage, isVerified }) {

    const valueOne = {
        title: (<h1>SUCCESFULLY <br></br> UPLOADED POST.</h1>),
        buttons: (
            <div className="popup-btns">
                <button onClick={() => { changeShowUpload(true) }}>Upload again</button>
                <button onClick={() => { changePage("home") }} >Back to homepage</button>
            </div>
        )
    }

    const valueTwo = {
        title: (<h1>PLEASE VERIFY ACCOUNT <br></br> TO UPLOAD POST.</h1>),
        buttons: (
            <div className="popup-btns">
                <button >Send Email Verification</button>
                <button onClick={() => { changePage("home") }} >Back to homepage</button>
            </div>
        )
    }

    const [showUpload, setShowUpload] = useState(false)
    const [popupValues, setPopupValues] = useState(isVerified ? valueOne : valueTwo)

    useEffect(() => {
        setPopupValues(isVerified ? valueOne : valueTwo)
    }, [isVerified])


    const changeShowUpload = (val) => {
        setShowUpload(val)
    }

    return (
        <div className='addpost-page'>
            {showUpload && isVerified
                ?
                <UploadPost uid={uid} popupValues={popupValues} />
                :
                <AddPostPopup changeShowUpload={changeShowUpload} changePage={changePage} popupValues={popupValues} />}

        </div>
    )
}

export default AddPostPage