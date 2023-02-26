import { useState, useEffect } from 'react'
import { uploadPost } from '../../../apis/firestoreDataQueryFuncs'
import "../../../css/loggedIn/addpost/addPostPage.css"
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddPostTexts from './AddPostTexts'


function UploadPost({ uid, changeShowUpload }) {


    const [uploadedImage, setUploadedImage] = useState([])
    const [imageURL, setImageURL] = useState(null)

    const [postVals, setPostVals] = useState({ title: "", caption: "" })
    const { title, caption } = postVals


    const handleInputChange = (e) => {
        setPostVals(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        if (uploadedImage.length < 1) { return }
        const url = URL.createObjectURL(uploadedImage[0])
        setImageURL(url)
    }, [uploadedImage])


    const handleImageUpload = async (e) => {
        e.preventDefault()
        const res = await uploadPost(uid, title, caption, uploadedImage[0])
        if (res === "post added.") {
            changeShowUpload(false)
        }
        console.log(res);
    }

    const changeUploadedImage = (image) => {
        setUploadedImage(image)
    }


    return (
        <>
            <div className="card">
                {imageURL
                    ?
                    <img src={imageURL} alt="" className='image-prev' />
                    :
                    <span className='upload-here'>
                        <FontAwesomeIcon className='upload-icn' icon={faArrowUpFromBracket} />
                        <h3>drag and drop image here.</h3>
                    </span>}
                <AddPostTexts uid={uid} title={title} caption={caption} handleInputChange={handleInputChange}
                    changeUploadedImage={changeUploadedImage} />
            </div>


            <div className="upload-btns">
                <label htmlFor="image" className='img-label'>Choose File</label>
                <button onClick={handleImageUpload} className="upload-btn">POST</button>
            </div>
        </>
    )
}

export default UploadPost