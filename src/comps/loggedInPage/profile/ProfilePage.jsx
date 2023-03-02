import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'
import Profile from './Profile'
import "../../../css/loggedIn/profilePage.css"
import { editUserInfo, getUserInfo } from '../../../apis/firestoreUsersFuncs'
function ProfilePage({ uid }) {


    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
        const queryUserInfo = async () => {
            const res = await getUserInfo(uid);
            setUserInfo(res)
        }

        queryUserInfo()

    }, [uid])

    useEffect(() => {
        console.log("INFO: ", userInfo);
    }, [userInfo])


    const callEditInfo = async (newInfo) => {
        const res = await editUserInfo(uid, newInfo);
    }

    return (
        <div className='profile-page'>
            <Profile uid={uid} userInfo={userInfo} callEditInfo={callEditInfo} />

        </div>
    )
}

export default ProfilePage