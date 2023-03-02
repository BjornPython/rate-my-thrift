import "../../css/loggedIn/posts.css"
import Post from "./Post"
import { getPosts } from "../../apis/firestoreDataQueryFuncs"
import { useEffect, useState } from "react"


function Posts({ handlePostClick, uid, updateLike, changeIsLoading }) {

    const [posts, setPosts] = useState([])



    useEffect(() => {
        changeIsLoading(true)
        const callGetPosts = async () => {
            const newPosts = await getPosts()
            setPosts(newPosts)
            setTimeout(() => {
                changeIsLoading(false)

            }, 500)
        }
        callGetPosts()
    }, [])



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