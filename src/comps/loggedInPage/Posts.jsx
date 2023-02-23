import "../../css/loggedIn/posts.css"
import Post from "./Post"

function Posts() {
    return (
        <div className='posts'>
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Posts