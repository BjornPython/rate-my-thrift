import { useState, useEffect } from 'react'
import { uploadImage } from '../../../apis/firestireDataQueryFuncs'
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
        <div>
            {imageURL && <img src={imageURL} alt="" style={{ width: "200px", height: "200px" }} />}
            <div onClick={() => { setImageURL(null); setImage([]) }}>DELETE</div>
            <input type="file" name="image" id="" onChange={(e) => { setImage(e.target.files) }} />
            <button onClick={handleImageUpload}>UPLOAD</button>
        </div>
    )
}

export default AddPostPage