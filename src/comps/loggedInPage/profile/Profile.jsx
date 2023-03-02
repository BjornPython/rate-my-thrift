import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faGear } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { addDp } from "../../../apis/firestoreUsersFuncs"


function Profile({ uid, callEditInfo }) {
    const [uploadedDp, setUploadedDp] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [nameBioVal, setNameBioVal] = useState({ name: "", bio: "" })
    const { name, bio } = nameBioVal



    useEffect(() => {
        if (uploadedDp.length > 0)
            console.log(uploadedDp[0]);
    }, [uploadedDp])

    const handleDpUpload = (e) => {
        setUploadedDp(e.target.files)
    }

    const callAddDp = async () => {
        const res = await addDp(uploadedDp[0], uid)
    }



    const changeIsEditing = (val) => {
        setIsEditing(val)
    }

    const handleNameBioChange = (e) => {
        setNameBioVal(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }



    return (
        <>
            <div className="main-profile">
                <FontAwesomeIcon icon={faCircle} className="profile-icn" />

                {isEditing ?
                    (
                        <div className="profile-n-b">
                            <input id="name-input" placeholder="Nathan Flores" name="name" value={name} onChange={handleNameBioChange} />
                            <input id="bio-input" placeholder="just a bio!" name="bio" value={bio} onChange={handleNameBioChange} />
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
                <div className={`active-settings ${isEditing && "show-active-settings"}`}>
                    <input type="file" id="profile-input" name="profile-input" className='profile-input' onChange={(e) => { setUploadedDp(e.target.files) }} />
                    <label htmlFor="profile-input" className="pic-label">upload profile</label>
                    <button onClick={() => { callEditInfo(nameBioVal); callAddDp() }}>  save</button>
                </div>
            </div>

        </>

    )
}

export default Profile