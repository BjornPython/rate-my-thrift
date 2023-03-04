import React, { useEffect, useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { uploadImage } from '../../../apis/firestoreDataQueryFuncs'
import getCroppedImg from '../../../cropping/cropImage'

function CropImage({ imageURL, changeImageUrl }) {

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)

    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [previewImg, setPreviewImg] = useState(null)
    const [cropSize, setCropSize] = useState({ width: "350px", height: "350px" })

    // useEffect(() => {
    //     if (!imageURL) { return }
    //     setImgURL(URL.createObjectURL(imageURL))
    // }, [imageURL])


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageURL,
                croppedAreaPixels
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            // setPreviewImg(croppedImage)
            changeImageUrl(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {

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
            { }
            <div className='cropimage-page'>
                {imageURL &&
                    <>
                        <Cropper image={imageURL} zoom={zoom} crop={crop} aspect={aspect}
                            onCropChange={onCropChange} onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete} objectFit="contain" />
                        <input type="range" className='zoom-range' value={zoom} min={1} max={3} step={0.1} onInput={(e) => { setZoom(e.target.value) }} />
                    </>
                }
                {previewImg && <img src='previewImg' />}
            </div>
            <button onClick={showCroppedImage}>SHOW CROPPED IMAGE</button>
            {croppedImage && <img src={croppedImage} alt='PREVIEW' style={{ width: "350px", height: "350px" }} />}
        </>

    )
}

export default CropImage