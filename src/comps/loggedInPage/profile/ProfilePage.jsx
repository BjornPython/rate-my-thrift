import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'

function ProfilePage({ uid }) {
    const [uploadedDp, setUploadedDp] = useState([])

    const handleDpUpload = (e) => {
        setUploadedDp(e.target.files)
    }

    useEffect(() => {
        if (uploadedDp.length > 0)
            console.log(uploadedDp[0]);
    }, [uploadedDp])

    const callAddDp = async () => {
        const res = await addDp(uploadedDp[0], uid)
    }

    return (
        <div>
            <input type="file" onChange={handleDpUpload} />
            <button onClick={callAddDp}>UPLOAD PROFILE</button>
        </div>
    )
}

export default ProfilePage