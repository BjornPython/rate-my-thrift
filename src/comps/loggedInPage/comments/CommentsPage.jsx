import "../../../css/loggedIn/comments/commentsPage.css"
import ShowUser from "./ShowUser"
import CommentsInput from "./CommentsInput"
import CommentsContents from "./CommentsContents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRef, useEffect, useState } from "react"
import { likePost } from "../../../apis/firestoreDataQueryFuncs"
import { getPostLikes } from "../../../apis/firestoreDataQueryFuncs"

function CommentsPage({ uid, showCommentPage, commentPost, removeCommentsPage, changePostLike }) {
    const wrapperCommentsRef = useRef()
    const { id, imageUrls, title, caption, dateTime, isLiked } = commentPost
    const [totalLikes, setTotalLikes] = useState(0)

    useEffect(() => {
        const userLikes = async () => {
            if (!id) { return }
            const likesCount = await getPostLikes(id)
            if (likesCount) { setTotalLikes(likesCount.postLikes) }
            else { setTotalLikes(0) }

        }
        userLikes()
    })


    // const callLikePost = async () => {
    //     await likePost(uid, post.id, !isLiked)
    // }

    const handleLike = () => {
        // setIsLiked(!isLiked)
        // callLikePost()
    }


    return (
        <div
            ref={wrapperCommentsRef}
            className={`comments-wrapper ${showCommentPage && "show-comments-page"}`}
            onClick={(e) => { removeCommentsPage(wrapperCommentsRef, e) }}
        >
            <div className="comments-page">
                <div className="comments-contents">
                    <div className="post-contents">
                        <div className="post-info">
                            <ShowUser />
                            <h1 className="comment-title">{title}</h1>
                            <p className="comment-caption">{caption}</p>
                            <p className="comment-date">{"no date "}</p>
                            <p className="post-likes">{totalLikes}</p>
                            <FontAwesomeIcon icon={faHeart} className="comments-heart-icn"
                                style={isLiked ? { color: "#ef3a5d" } : {}}
                                onClick={() => { changePostLike(id, !isLiked) }}
                            />
                        </div>
                        <img src={imageUrls} className="post-img comments-img" />

                    </div>
                    <h3 className="comments-sign">Comments</h3>

                    <CommentsContents />
                    <CommentsInput />
                </div>

            </div>

        </div >

    )
}

export default CommentsPage