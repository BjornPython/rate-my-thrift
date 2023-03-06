import { useState, useEffect, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "../../../cropping/cropImage"
function DpCropper({ uploadedDp, changeIsCropping, changeCroppedImage }) {

    const [uploadedDpURL] = useState(URL.createObjectURL(uploadedDp))
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    useEffect(() => {
        console.log("CHANGED");

    }, [uploadedDpURL])



    const onCropChange = (e) => {
        setCrop(e)
    }

    const onZoomChange = (e) => {
        setZoom(e)
    }

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                uploadedDpURL,
                croppedAreaPixels
            )
            changeCroppedImage(croppedImage)
            changeIsCropping(false)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])




    const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {

        setCroppedAreaPixels(newCroppedAreaPixels)
    }, [])

    return (
        <>
            <div className="dp-cropper" style={{ width: "290px", height: "290px" }} >
                <Cropper image={uploadedDpURL} zoom={zoom} crop={crop} aspect={aspect}
                    onCropChange={onCropChange} onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete} objectFit="contain" cropShape="round" />

            </div>
            <div className="dp-edit-container">
                <button onClick={showCroppedImage}>save crop</button>
            </div>
        </>


    )
}

export default DpCropper