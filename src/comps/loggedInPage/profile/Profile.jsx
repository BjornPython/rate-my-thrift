import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faGear } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react'
import { addDp } from "../../../apis/firestoreUsersFuncs"
import DpCropper from "./DpCropper"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
function Profile({ uid, dpURL, callEditInfo, diffUser }) {
    const [uploadedDp, setUploadedDp] = useState(null)
    const [croppedDp, setCroppedDp] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isCropping, setIsCropping] = useState(false)
    const [nameBioVal, setNameBioVal] = useState({ name: "", bio: "" })
    const { name, bio } = nameBioVal

    useEffect(() => {
        if (!uid) { return }
        const userInfo = async () => {
            const info = await getUserInfo(uid)
            if (info) {
                setNameBioVal({ name: info.name, bio: info.bio })
            }
        }
        userInfo()
    }, [uid])

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
        setIsEditing(false)
        if (!croppedDp) { return }
        const croppedBlob = await requestCroppedDp()
        const croppedImageFile = new File([croppedBlob], uploadedDp.name, { type: uploadedDp.type });
        console.log("CROPPED DP: ", croppedImageFile);
        const res = await addDp(croppedImageFile, uid)
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

    const requestCroppedDp = async () => {
        const croppedIMG = await fetch(croppedDp)
        const croppedBlob = croppedIMG.blob()
        return croppedBlob
    }

    return (
        <>
            <div className="main-profile">
                {dpURL || uploadedDp
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
                            <p id="profile-name">{name}</p>
                            <p id="profile-bio">{bio}</p>
                        </div>
                    )
                }
                {!diffUser &&
                    <>
                        <FontAwesomeIcon icon={faGear} className="profile-settings"
                            onClick={() => { changeIsEditing(!isEditing) }} />
                        <div className={`active-settings ${isEditing && "show-active-settings"}`}>
                            <input type="file" id="profile-input" name="profile-input" className='profile-input' onChange={(e) => { handleDpUpload(e) }} />
                            <div className="edit-dp-btns">
                                <label htmlFor="profile-input" className="pic-label">file </label>
                                <button onClick={() => { setIsCropping(true) }} style={!croppedDp ? { color: "gray" } : {}}>crop</button>
                            </div>
                            <button onClick={() => { callEditInfo(nameBioVal); callAddDp() }}>save</button>
                        </div>

                        {uploadedDp && isCropping && <DpCropper uploadedDp={uploadedDp} changeIsCropping={changeIsCropping} changeCroppedImage={changeCroppedImage} />}
                    </>
                }
            </div>

        </>

    )
}

export default Profile