import "../../css/loggedIn/post.css"
import demo from "../../images/demo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function Post({ title, caption, imgLink }) {
    return (
        <div className="post">
            <img src={imgLink} alt="pic" className="post-img" />
            <h1 className="post-title">{title}</h1>
            <div className="post-txt">
                <p>{caption}</p>
                <FontAwesomeIcon icon={faHeart} className="heart-icn" />
            </div>
        </div>
    )
}

export default Post