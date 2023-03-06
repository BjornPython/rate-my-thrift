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


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageURL,
                croppedAreaPixels
            )
            setCroppedImage(croppedImage)
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
            <div className='cropimage-page'>
                {imageURL &&
                    <>
                        <Cropper image={imageURL} zoom={zoom} crop={crop} aspect={aspect}
                            onCropChange={onCropChange} onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete} />
                        <input type="range" className='zoom-range' value={zoom} min={1} max={3} step={0.1} onInput={(e) => { setZoom(e.target.value) }} />
                    </>
                }
            </div>

            <button className='save-crop' onClick={showCroppedImage}>Save Crop </button>
        </>

    )
}

export default CropImage