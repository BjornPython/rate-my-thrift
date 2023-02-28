import "../../css/loggedIn/post.css"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { likePost } from "../../apis/firestoreDataQueryFuncs"
import { getPostLikes } from "../../apis/firestoreDataQueryFuncs"
function Post({ handlePostClick, post, uid }) {

    const { title, caption, imageUrls } = post
    const [userLikes, setUserLikes] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    const callLikePost = async () => {
        await likePost(uid, post.id, true)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        callLikePost()
    }

    useEffect(() => {
        getPostLikes(post.id)
    }, [])


    return (
        <div className="post">
            <img src={imageUrls} alt="pic" className="post-img" onDoubleClick={handleLike}
                onClick={() => { handlePostClick(post) }} />
            <h1 className="post-title">{title}</h1>
            <div className="post-txt">
                <p onClick={() => { handlePostClick(post) }}>{caption}</p>
                <FontAwesomeIcon icon={faHeart} className="heart-icn"
                    style={isLiked ? { color: "#ef3a5d" } : {}}
                    onClick={handleLike} />
            </div>
        </div>
    )
}

export default Post