import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

const img = "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FmQGNafAooIVhPlFSc2t4yUzK8X03%2FuserPosts%2Fdemo2.jpg?alt=media&token=92d40acd-4a3d-420b-8a46-080e8f07aae8"
function CropImage() {

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)


    const onCropChange = (crop) => {
        setCrop(crop)
    }
    return (
        <div className='cropimage-page'>
            {/* <img src={img} alt="img preview" /> */}
            <div className="crop-container"></div>
            <Cropper image={img} zoom={zoom} crop={crop} aspect={aspect.value} onCropChange={onCropChange} />
        </div>
    )
}

export default CropImage