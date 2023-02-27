import "../../../css/loggedIn/comments/commentsPage.css"
import ShowUser from "./ShowUser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRef, useEffect } from "react"
function CommentsPage({ showCommentPage, commentPost, removeCommentsPage }) {


    const commentsRef = useRef()

    useEffect(() => {
        console.log(commentsRef);
    }, [commentsRef])

    // onClick={() => { removeCommentsPage(wrapperCommentRef, commentsRef) }}
    const { imageUrls, title, caption, dateTime } = commentPost
    return (
        <div className={`comments-wrapper ${showCommentPage && "show-comments-page"}`}
            onClick={(e) => { removeCommentsPage(commentsRef, e) }}>
            <div ref={commentsRef} className={`comments-page `}>

                <div className="post-contents">
                    <div className="post-info">
                        <ShowUser />
                        <h1 className="comment-title">{title}</h1>
                        <p className="comment-caption">{caption}</p>
                        <p className="comment-date">{"no date "}</p>
                        <FontAwesomeIcon icon={faHeart} className="comments-heart-icn" />
                    </div>
                    <img src={imageUrls} className="post-img comments-img" />

                </div>
                <h3 className="comments-sign">Comments</h3>


            </div>
        </div>

    )
}

export default CommentsPage