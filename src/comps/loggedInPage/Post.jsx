import "../../css/loggedIn/post.css"
import demo from "../../images/demo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function Post() {
    return (

        <div className="post">
            <img src="https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2FuserId%2FuserPosts%2Fdemo.jpg?alt=media&token=f66a611c-c4f0-45cc-8540-b4218eb96b1f" alt="pic" className="post-img" />
            <div className="post-txt">
                <p>What do you guys think of my clothes?</p>
                <FontAwesomeIcon icon={faHeart} className="heart-icn" />
            </div>
        </div>
    )
}

export default Post