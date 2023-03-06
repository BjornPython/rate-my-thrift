import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faGear } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { addDp } from "../../../apis/firestoreUsersFuncs"
import DpCropper from "./DpCropper"

function Profile({ uid, dpURL, callEditInfo }) {
    const [uploadedDp, setUploadedDp] = useState(null)
    const [croppedDp, setCroppedDp] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isCropping, setIsCropping] = useState(false)
    const [nameBioVal, setNameBioVal] = useState({ name: "", bio: "" })
    const { name, bio } = nameBioVal



    useEffect(() => {
        if (uploadedDp)
            console.log(uploadedDp);
    }, [uploadedDp])

    useEffect(() => {
        if (!croppedDp) { return }

    }, [croppedDp])

    const handleDpUpload = (e) => {
        setUploadedDp(e.target.files[0])
        setCroppedDp(URL.createObjectURL(e.target.files[0]))
    }

    const callAddDp = async () => {
        if (uploadedDp.length !== 1) { return }
        const res = await addDp(uploadedDp, uid)
    }



    const changeIsEditing = (val) => {
        setIsEditing(val)
    }

    const changeIsCropping = (val) => {
        setIsCropping(val)
    }

    const handleNameBioChange = (e) => {
        setNameBioVal(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const changeCroppedImage = (dp) => {
        setCroppedDp(dp)
    }

    return (
        <>
            <div className="main-profile">
                {dpURL
                    ?
                    <img src={croppedDp ? croppedDp : dpURL} className="profile-icn" />
                    :
                    <FontAwesomeIcon icon={faCircle} className="profile-icn" />
                }

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
                    <input type="file" id="profile-input" name="profile-input" className='profile-input' onChange={(e) => { handleDpUpload(e) }} />
                    <label htmlFor="profile-input" className="pic-label">file </label>
                    <button onClick={() => { setIsCropping(true) }}>crop</button>
                    <button onClick={() => { callEditInfo(nameBioVal); callAddDp() }}>  save</button>
                </div>

                {uploadedDp && isCropping && <DpCropper uploadedDp={uploadedDp} changeIsCropping={changeIsCropping} changeCroppedImage={changeCroppedImage} />}
            </div>

        </>

    )
}

export default Profile