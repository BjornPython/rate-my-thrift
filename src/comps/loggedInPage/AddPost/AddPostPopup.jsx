import { useState } from 'react'

function AddPostPopup({ popupValues }) {

    return (
        <div className="upload-popup">
            {popupValues.title}
            <div className={`popup-btns`}>
                {popupValues.buttons}
            </div>

        </div>
    )
}

export default AddPostPopup