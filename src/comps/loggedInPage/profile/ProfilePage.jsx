import { useState, useEffect } from 'react'
import { addDp } from '../../../apis/firestoreDataQueryFuncs'
import Profile from './Profile'
import "../../../css/loggedIn/profilePage.css"
import UserPosts from './UserPosts'
import { editUserInfo, getUserInfo } from '../../../apis/firestoreUsersFuncs'
function ProfilePage({ uid, changeIsLoading, handlePostClick, updateLike, startKey }) {


    const [userInfo, setUserInfo] = useState(null)
    const [dpURL, setDpURL] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        changeIsLoading(true)
        const queryUserInfo = async () => {
            console.log("QUERYING INFO: ", uid);
            const res = await getUserInfo(uid);
            setUserInfo(res)
            setDpURL(res.dpURL)
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
            <Profile uid={uid} dpURL={dpURL} userInfo={userInfo} callEditInfo={callEditInfo} changeIsLoading={changeIsLoading} />
            <hr />
            <UserPosts handlePostClick={handlePostClick} uid={uid} updateLike={updateLike} startKey={startKey} />
        </div>
    )
}

export default ProfilePage