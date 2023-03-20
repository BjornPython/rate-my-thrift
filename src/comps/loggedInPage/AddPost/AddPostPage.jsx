import { useState, useEffect } from 'react'
import UploadPost from './UploadPost'
import AddPostPopup from './AddPostPopup'
import { auth } from '../../../apis/firebase'
import { sendEmailVerification } from 'firebase/auth'

function AddPostPage({ uid, changePage, isVerified, changeIsLoading }) {

    const [showUpload, setShowUpload] = useState(true)

    const changeShowUpload = (val) => {
        setShowUpload(val)
    }

    return (
        <div className='addpost-page'>
            {showUpload && isVerified
                ?
                <UploadPost uid={uid} changeShowUpload={changeShowUpload} changeIsLoading={changeIsLoading} />
                :
                <AddPostPopup changeShowUpload={changeShowUpload} changePage={changePage} />}

        </div>
    )
}

export default AddPostPage