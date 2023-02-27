import "../../css/loggedIn/post.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function Post({ handlePostClick, post }) {

    const { title, caption, imageUrls } = post

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

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