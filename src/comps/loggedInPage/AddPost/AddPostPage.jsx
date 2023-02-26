import { useState, useEffect } from 'react'
import { uploadPost } from '../../../apis/firestoreDataQueryFuncs'
import "../../../css/loggedIn/addpost/addPostPage.css"
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddPostTexts from './AddPostTexts'
function AddPostPage({ uid }) {

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


    const handleImageUpload = (e) => {
        e.preventDefault()
        const res = uploadPost(uid, title, caption, uploadedImage[0])
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
                <AddPostTexts uid={uid} title={title} caption={caption} handleInputChange={handleInputChange}
                    changeUploadedImage={changeUploadedImage} />
            </div>


            <div className="upload-btns">
                <label htmlFor="image" className='img-label'>Choose File</label>
                <button onClick={handleImageUpload} className="upload-btn">POST</button>
            </div>

        </div>
    )
}

export default AddPostPage