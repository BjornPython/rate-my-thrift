import React from 'react'

function AddPostPopup({ popupValues }) {


    return (
        <div className='upload-popup'>
            {/* <h1>SUCCESFULLY <br></br> UPLOADED POST.</h1> */}
            {popupValues.title}
            <div className="popup-btns">
                {/* <button onClick={() => { changeShowUpload(true) }}>Upload again</button>
                <button onClick={() => { changePage("home") }} >Back to homepage</button> */}
                {popupValues.buttons}
            </div>

        </div>
    )
}

export default AddPostPopup