import { useEffect, useState } from "react"
import Post from "../Post"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"
import { getPost } from "../../../apis/firestoreDataQueryFuncs"

function UserPosts({ handlePostClick, updateLike, uid, startKey }) {
    const [postIds, setPostIds] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        if (!uid) { return }
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
                    <Post key={`${startKey}-${post.id}`} handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
                )
            })}
            {/* <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
            <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} /> */}
        </div>
    )
}

export default UserPosts