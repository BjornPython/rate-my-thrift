import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'
import Profile from './Profile'
import "../../../css/loggedIn/profilePage.css"

function ProfilePage({ uid }) {

    return (
        <div className='profile-page'>
            <Profile uid={uid} />

        </div>
    )
}

export default ProfilePage