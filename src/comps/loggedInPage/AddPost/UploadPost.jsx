import { useState, useEffect } from 'react'
import { uploadPost } from '../../../apis/firestoreDataQueryFuncs'
import "../../../css/loggedIn/addpost/addPostPage.css"
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddPostTexts from './AddPostTexts'
import CropImage from './CropImage'


function UploadPost({ uid, changeShowUpload }) {


    const [uploadedImage, setUploadedImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [croppedURL, setCroppedURL] = useState(null)

    const [isUploading, setIsUploading] = useState(false)
    const [postVals, setPostVals] = useState({ title: "", caption: "" })
    const { title, caption } = postVals
    const [isCropping, setIsCropping] = useState(false)




    useEffect(() => {
        console.log("IS CROPPING VAL: ", isCropping);
    }, [isCropping])

    useEffect(() => {
        if (!uploadedImage) { return }
        console.log("UPLOADED IMAGE: ", uploadedImage);
        const url = URL.createObjectURL(uploadedImage)
        console.log("URL: ", url);
        setImageURL(url)
        setCroppedURL(url)
    }, [uploadedImage])

    const handleInputChange = (e) => {
        setPostVals(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleImageUpload = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        const croppedBlob = await requestCroppedImage()
        const croppedImageFile = new File([croppedBlob], uploadedImage.name, { type: 'image/jpeg' });
        console.log("IMAGE FILE: ", croppedImageFile);
        const res = await uploadPost(uid, title, caption, croppedImageFile)
        if (res === "post added.") {
            changeShowUpload(false)
            setTimeout(() => {
                setIsUploading(false)
            }, 400)
        }
        console.log(res);
    }

    const changeUploadedImage = (image) => {
        setUploadedImage(image)
    }

    const changeImageUrl = (url) => {
        setIsCropping(false)
        setCroppedURL(url)
    }

    const requestCroppedImage = async () => {
        const croppedIMG = await fetch(croppedURL)
        const croppedBlob = croppedIMG.blob()
        return croppedBlob
    }

    return (
        <>
            <div className="card">
                {imageURL
                    ?
                    <img src={croppedURL} alt="" className='image-prev' onDoubleClick={() => { setIsCropping(true) }}
                        style={isCropping ? { opacity: 0 } : {}} />
                    :
                    <span className='upload-here'>
                        <FontAwesomeIcon className='upload-icn' icon={faArrowUpFromBracket} />
                        <h3>drag and drop image here.</h3>
                    </span>}

                <AddPostTexts uid={uid} title={title} caption={caption} handleInputChange={handleInputChange}
                    changeUploadedImage={changeUploadedImage} uploadedImage={uploadedImage} />
                <span className={`uploading-icn ${isUploading && "uploading-icn-active"}`}></span>

                {isCropping && <CropImage imageURL={imageURL} changeImageUrl={changeImageUrl} />}

            </div>


            <div className="upload-btns">
                <label htmlFor="image" className='img-label'>Choose File</label>
                {isUploading && <p>Uploading...</p>}
                <button onClick={handleImageUpload} className="upload-btn">POST</button>
            </div>
        </>
    )
}

export default UploadPost