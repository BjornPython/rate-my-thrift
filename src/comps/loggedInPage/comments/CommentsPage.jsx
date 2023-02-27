import "../../../css/loggedIn/comments/commentsPage.css"
import ShowUser from "./ShowUser"
import CommentsInput from "./CommentsInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRef, useEffect } from "react"
function CommentsPage({ showCommentPage, commentPost, removeCommentsPage }) {


    const wrapperCommentsRef = useRef()



    // onClick={() => { removeCommentsPage(wrapperCommentRef, commentsRef) }}
    const { imageUrls, title, caption, dateTime } = commentPost
    return (
        <div
            ref={wrapperCommentsRef}
            className={`comments-wrapper ${showCommentPage && "show-comments-page"}`}
            onClick={(e) => { removeCommentsPage(wrapperCommentsRef, e) }}
        >
            <div className={`comments-page `}>

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


                <CommentsInput />
            </div>
        </div>

    )
}

export default CommentsPage