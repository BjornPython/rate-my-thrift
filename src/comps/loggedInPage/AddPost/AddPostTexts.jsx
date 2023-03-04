import { useState } from 'react'
function AddPostTexts({ title, caption, handleInputChange, changeUploadedImage, uploadedImage }) {



    return (
        <>
            <input type="file" name="image" id="image" onChange={(e) => { changeUploadedImage(e.target.files[0]) }}
                className={`input-file ${uploadedImage && "off-input-file"}`} />
            <input type="text" name="title" value={title} className='upload-title' placeholder='Add a title' onChange={handleInputChange} />
            <input type="text" name="caption" value={caption} className='upload-caption' placeholder='Add a caption...' onChange={handleInputChange} />
        </>
    )
}

export default AddPostTexts