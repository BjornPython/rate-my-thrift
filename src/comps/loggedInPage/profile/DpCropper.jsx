import { useState, useEffect } from "react"
import Cropper from "react-easy-crop"

function DpCropper({ uploadedDp }) {

    const [uploadedDpURL] = useState(URL.createObjectURL(uploadedDp))
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [aspect, setAspect] = useState(1 / 1)

    useEffect(() => {
        console.log("CHANGED");

    }, [uploadedDpURL])


    const onCropChange = (e) => {
        setCrop(e)
    }

    const onZoomChange = (e) => {
        setZoom(e)
    }

    const onCropComplete = (e) => {

    }

    return (
        <>
            <div className="dp-cropper" style={{ width: "300px", height: "300px" }} >
                <Cropper image={uploadedDpURL} zoom={zoom} crop={crop} aspect={aspect}
                    onCropChange={onCropChange} onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete} objectFit="contain" cropShape="round" />

            </div>
            <div className="dp-edit-container">
                <button>save crop</button>
            </div>
        </>


    )
}

export default DpCropper