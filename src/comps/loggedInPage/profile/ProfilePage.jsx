import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'
import Profile from './Profile'
import "../../../css/loggedIn/profilePage.css"
import { editUserInfo, getUserInfo } from '../../../apis/firestoreUsersFuncs'
function ProfilePage({ uid, changeIsLoading }) {


    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
        changeIsLoading(true)
        const queryUserInfo = async () => {
            const res = await getUserInfo(uid);
            setUserInfo(res)
            setTimeout(() => {
                changeIsLoading(false)
            }, 500)
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
            <Profile uid={uid} userInfo={userInfo} callEditInfo={callEditInfo} changeIsLoading={changeIsLoading} />

        </div>
    )
}

export default ProfilePage