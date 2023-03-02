import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faGear } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'

function Profile({ uid }) {
    const [uploadedDp, setUploadedDp] = useState([])
    const [isEditing, setIsEditing] = useState(false)

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

    const changeIsEditing = (val) => {
        setIsEditing(val)
    }

    return (
        <>
            <div className="main-profile">
                <FontAwesomeIcon icon={faCircle} className="profile-icn" />

                {isEditing ?
                    (
                        <div className="profile-n-b">
                            <input id="name-input" placeholder="Nathan Flores" />
                            <input id="bio-input" placeholder="just a bio!" />
                        </div>
                    )

                    :
                    (
                        <div className="profile-n-b">
                            <p id="profile-name">Nathan Flores</p>
                            <p id="profile-bio">just a bio!</p>
                        </div>
                    )
                }

                <FontAwesomeIcon icon={faGear} className="profile-settings"
                    onClick={() => { changeIsEditing(!isEditing) }} />

            </div>
            <div className={`active-settings ${isEditing && "show-active-settings"}`}>
                <input type="file" id="profile-input" name="profile-input" className='profile-input' />
                <label htmlFor="profile-input">choose</label>
                <button >  save</button>
            </div>
        </>

    )
}

export default Profile