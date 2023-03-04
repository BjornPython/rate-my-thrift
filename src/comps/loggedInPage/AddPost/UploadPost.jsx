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
    const [isUploading, setIsUploading] = useState(false)
    const [postVals, setPostVals] = useState({ title: "", caption: "" })
    const { title, caption } = postVals
    const [isCropping, setIsCropping] = useState(false)

    const handleInputChange = (e) => {
        setPostVals(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        if (!uploadedImage) { return }
        const url = URL.createObjectURL(uploadedImage)
        setImageURL(url)
    }, [uploadedImage])


    const handleImageUpload = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        const res = await uploadPost(uid, title, caption, uploadedImage)
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

    const toggleCropping = (val) => {
        setIsCropping(val)
    }

    return (
        <>
            <div className="card">
                {imageURL
                    ?
                    <img src={imageURL} alt="" className='image-prev' onDoubleClick={() => { setIsCropping(!isCropping) }} />
                    :
                    <span className='upload-here'>
                        <FontAwesomeIcon className='upload-icn' icon={faArrowUpFromBracket} />
                        <h3>drag and drop image here.</h3>
                    </span>}
                <AddPostTexts uid={uid} title={title} caption={caption} handleInputChange={handleInputChange}
                    changeUploadedImage={changeUploadedImage} uploadedImage={uploadedImage} />
                <span className={`uploading-icn ${isUploading && "uploading-icn-active"}`}></span>

                {isCropping && <CropImage imageURL={imageURL} />}

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