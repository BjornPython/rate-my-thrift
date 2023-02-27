import "../../css/loggedIn/posts.css"
import Post from "./Post"
import { getPosts } from "../../apis/firestoreDataQueryFuncs"
import { useEffect, useState } from "react"


function Posts({ handlePostClick }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const callGetPosts = async () => {
            const newPosts = await getPosts()
            setPosts(newPosts)
        }
        callGetPosts()
    }, [])



    return (
        <div className='posts'>
            {posts && posts.map((post) => {
                return <Post key={post.id}
                    handlePostClick={handlePostClick} post={post} />
            })}
        </div>
    )
}

export default Posts