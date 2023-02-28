import "../../css/loggedIn/posts.css"
import Post from "./Post"
import { getPosts } from "../../apis/firestoreDataQueryFuncs"
import { useEffect, useState } from "react"


function Posts({ handlePostClick, uid, updateLike }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const callGetPosts = async () => {
            const newPosts = await getPosts()
            setPosts(newPosts)
        }
        callGetPosts()
    }, [])

    useEffect(() => {
        console.log(posts);
    }, [posts])


    return (
        <div className='posts'>
            {posts && posts.map((post) => {
                return <Post key={post.id}
                    handlePostClick={handlePostClick} post={post} uid={uid} updateLike={updateLike} />
            })}
        </div>
    )
}

export default Posts