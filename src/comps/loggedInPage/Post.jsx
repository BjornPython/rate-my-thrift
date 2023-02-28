import "../../css/loggedIn/post.css"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { likePost } from "../../apis/firestoreDataQueryFuncs"
import { getPostLikes } from "../../apis/firestoreDataQueryFuncs"


function Post({ handlePostClick, post, uid, updateLike }) {
    const { title, caption, imageUrls } = post
    const [isLiked, setIsLiked] = useState(false)

    const callLikePost = async () => {
        await likePost(uid, post.id, !isLiked)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        callLikePost()
    }

    useEffect(() => {
        const checkIsLiked = async () => {
            try {
                const postLikes = await getPostLikes(post.id);
                if (postLikes.likes[uid]) { setIsLiked(true) }
            } catch (err) { }
        }
        checkIsLiked()
    }, [])

    useEffect(() => {
        console.log("IN POST: ", updateLike);
        if (!updateLike) { return }
        const { key, val } = updateLike
        if (key === post.id) {
            setIsLiked(val)
        }
    }, [updateLike])

    return (
        <div className="post">
            <img src={imageUrls} alt="pic" className="post-img" onDoubleClick={handleLike}
                onClick={() => { handlePostClick(post, isLiked) }} />
            <h1 className="post-title">{title}</h1>
            <div className="post-txt">
                <p onClick={() => { handlePostClick(post, isLiked) }}>{caption}</p>
                <FontAwesomeIcon icon={faHeart} className="heart-icn"
                    style={isLiked ? { color: "#ef3a5d" } : {}}
                    onClick={handleLike} />
            </div>
        </div>
    )
}

export default Post