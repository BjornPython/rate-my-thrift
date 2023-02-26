import { useState, useEffect } from 'react'
import { uploadImage } from '../../../apis/firestireDataQueryFuncs'
import "../../../css/loggedIn/addpost/addPostPage.css"
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function AddPostPage() {

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState(null)

    useEffect(() => {
        if (image.length < 1) { return }
        const url = URL.createObjectURL(image[0])
        setImageURL(url)
    }, [image])

    const handleImageUpload = (e) => {
        e.preventDefault()
        const res = uploadImage(image[0])
        console.log(res);
    }

    return (
        <div className='addpost-page'>
            <div onClick={() => { setImageURL(null); setImage([]) }}>DELETE</div>

            <div className="card">
                {imageURL
                    ?
                    <img src={imageURL} alt="" className='image-prev' />
                    :
                    <span className='upload-here'>
                        <FontAwesomeIcon className='upload-icn' icon={faArrowUpFromBracket} />
                        <h3>drag and drop image here.</h3>
                    </span>}
                <input type="file" name="image" id="image" onChange={(e) => { setImage(e.target.files) }} className="input-file" />
            </div>

            <div className="upload-btns">
                <label for="image" className='img-label'>Choose File</label>
                <button onClick={handleImageUpload}>UPLOAD</button>
            </div>

        </div>
    )
}

export default AddPostPage