import React, { useEffect, useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { uploadImage } from '../../../apis/firestoreDataQueryFuncs'
import getCroppedImg from '../../../cropping/cropImage'

const img = "https://i.pinimg.com/564x/ad/bd/86/adbd86d3b3cc6fd37c9fc99c32cb7b27.jpg"
function CropImage() {

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)

    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [imgURL, setImgURL] = useState(null)

    useEffect(() => {
        console.log("IMAGE: ", uploadedImage);
        if (!uploadedImage) { return }
        setImgURL(URL.createObjectURL(uploadedImage))
    }, [uploadedImage])


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imgURL,
                croppedAreaPixels
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {
        console.log("AREA: ", croppedArea);
        console.log("DONE: ", newCroppedAreaPixels);
        setCroppedAreaPixels(newCroppedAreaPixels)
    }, [])

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }
    return (
        <>
            <input type="file" onChange={(e) => { setUploadedImage(e.target.files[0]) }} />
            <div className='cropimage-page'>
                {/* <img src={img} alt="img preview" /> */}
                <div className="crop-container"></div>
                {imgURL &&
                    <>
                        <Cropper image={imgURL} zoom={zoom} crop={crop} aspect={aspect}
                            onCropChange={onCropChange} onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete} />
                        <input type="range" className='zoom-range' value={zoom} min={1} max={3} step={0.1} onInput={(e) => { setZoom(e.target.value) }} />
                    </>
                }

            </div>
            <button onClick={showCroppedImage}>SHOW CROPPED IMAGE</button>
            {croppedImage && <img src='' alt='PREVIEW' />}
        </>

    )
}

export default CropImage