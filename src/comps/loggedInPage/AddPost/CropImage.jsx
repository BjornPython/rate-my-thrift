import React, { useEffect, useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { uploadImage } from '../../../apis/firestoreDataQueryFuncs'
import getCroppedImg from '../../../cropping/cropImage'

function CropImage({ imageURL }) {

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)

    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [imgURL, setImgURL] = useState(null)
    const [previewImg, setPreviewImg] = useState(null)


    // useEffect(() => {
    //     if (!imageURL) { return }
    //     setImgURL(URL.createObjectURL(imageURL))
    // }, [imageURL])


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imgURL,
                croppedAreaPixels
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            setPreviewImg(croppedImage)
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
        console.log("CHANIGNG");
        setCrop(crop)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }
    return (
        <>
            <div className='cropimage-page'>
                {imageURL &&
                    <>
                        <Cropper image={imageURL} zoom={zoom} crop={crop} aspect={aspect}
                            onCropChange={onCropChange} onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete} />
                        <input type="range" className='zoom-range' value={zoom} min={1} max={3} step={0.1} onInput={(e) => { setZoom(e.target.value) }} />
                    </>
                }
                {previewImg && <img src='previewImg' />}
            </div>
            <button onClick={showCroppedImage}>SHOW CROPPED IMAGE</button>
            {croppedImage && <img src={croppedImage} alt='PREVIEW' />}
        </>

    )
}

export default CropImage