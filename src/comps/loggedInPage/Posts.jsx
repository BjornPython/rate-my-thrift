import "../../css/loggedIn/posts.css"
import Post from "./Post"
import { getPosts } from "../../apis/firestireDataQueryFuncs"
import { useEffect } from "react"
function Posts() {

    const posts = [
        {
            id: 1,
            title: "12/01/92",
            caption: "Found this great Jacket!",
            imgLink: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FuserId%2FuserPosts%2Fdemo.jpg?alt=media&token=f66a611c-c4f0-45cc-8540-b4218eb96b1f"
        },
        {
            id: 2,
            title: "i feel GOOD",
            caption: "What a good find!",
            imgLink: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FuserId%2FuserPosts%2Fdemo2.jpg?alt=media&token=6d5dd211-d9f1-4ca5-93f6-0f3053d503b1"
        },
        {
            id: 3,
            title: "can't help it",
            caption: "This is why i love thrifting...",
            imgLink: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FuserId%2FuserPosts%2Fdemo3.jpg?alt=media&token=6878b8d3-98c7-4561-8abf-fc263718ddd1"
        },
        {
            id: 4,
            title: "WORTH IT!",
            caption: "Check what i found",
            imgLink: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FuserId%2FuserPosts%2Fdemo4.jpg?alt=media&token=a77ad916-a7a3-458b-bf54-9bef0ffa4b70"
        }
    ]


    return (
        <div className='posts'>
            {posts.map((post) => { return <Post key={post.id} title={post.title} caption={post.caption} imgLink={post.imgLink} /> })}
        </div>
    )
}

export default Posts