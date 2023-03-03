import { useEffect, useState } from "react"
import Post from "../Post"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
import { getPost } from "../../../apis/firestoreDataQueryFuncs"

function UserPosts({ handlePostClick, updateLike, uid }) {
    const post = { caption: "TEST CAPTION", title: "JUST A TITLE", imageUrls: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2F83LtPLmHrMdUto3hamWfl8nC33x1%2FuserPosts%2Fbackground.jpg?alt=media&token=0588c422-d84b-403d-9f32-0122637ab3f5" }
    const [postIds, setPostIds] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const callUserInfo = async () => {
            const userInfo = await getUserInfo(uid);
            if (userInfo) {
                setPostIds(userInfo.posts)
            }
        }
        callUserInfo()
    }, [uid])

    useEffect(() => {
        if (postIds.length <= 0) { return }
        postIds.map(async (postId) => {
            const post = await getPost(postId)
            setPosts(prevState => { return [...prevState, post] })
        })
    }, [postIds])

    return (
        <div className="profile-posts">
            {posts.length > 0 && posts.map(post => {
                return (
                    <Post key={post.id} handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
                )
            })}
            {/* <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
            <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} /> */}
        </div>
    )
}

export default UserPosts