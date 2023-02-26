import { useState, useEffect } from 'react'
import { uploadImage } from '../../../apis/firestireDataQueryFuncs'
import "../../../css/loggedIn/addpost/addPostPage.css"
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddPostTexts from './AddPostTexts'
function AddPostPage() {

    const [uploadedImage, setUploadedImage] = useState([])
    const [imageURL, setImageURL] = useState(null)



    useEffect(() => {
        if (uploadedImage.length < 1) { return }
        const url = URL.createObjectURL(uploadedImage[0])
        setImageURL(url)
    }, [uploadedImage])

    const handleImageUpload = (e) => {
        e.preventDefault()
        const res = uploadImage(uploadedImage[0])
        console.log(res);
    }

    const changeUploadedImage = (image) => {
        setUploadedImage(image)
    }

    return (
        <div className='addpost-page'>
            <div onClick={() => { setImageURL(null); setUploadedImage([]) }}>DELETE</div>

            <div className="card">
                {imageURL
                    ?
                    <img src={imageURL} alt="" className='image-prev' />
                    :
                    <span className='upload-here'>
                        <FontAwesomeIcon className='upload-icn' icon={faArrowUpFromBracket} />
                        <h3>drag and drop image here.</h3>
                    </span>}
                <AddPostTexts changeUploadedImage={changeUploadedImage} />
            </div>


            <div className="upload-btns">
                <label htmlFor="image" className='img-label'>Choose File</label>
                <button onClick={handleImageUpload} className="upload-btn">POST</button>
            </div>

        </div>
    )
}

export default AddPostPage