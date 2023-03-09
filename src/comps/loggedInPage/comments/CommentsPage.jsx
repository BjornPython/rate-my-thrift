import "../../../css/loggedIn/comments/commentsPage.css"
import ShowUser from "./ShowUser"
import CommentsInput from "./CommentsInput"
import CommentsContents from "./CommentsContents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRef, useEffect, useState } from "react"
import { getPostLikes } from "../../../apis/firestoreDataQueryFuncs"
import { likePost } from "../../../apis/firestoreDataQueryFuncs"

function CommentsPage({
    uid, showCommentPage, commentPost,
    removeCommentsPage, changePostLike, updateProfilePreview
}) {
    const wrapperCommentsRef = useRef()
    const { id, imageUrls, title, caption, dateTime, isLiked, userId } = commentPost
    const [totalLikes, setTotalLikes] = useState(0)
    const [date, setDate] = useState("")
    const [liked, setLiked] = useState(false)
    const [newAddedComment, setNewAddedComment] = useState([])

    useEffect(() => {
        const userLikes = async () => {
            if (!id) { return }
            const likesCount = await getPostLikes(id)
            if (likesCount) { setTotalLikes(likesCount.postLikes) }
            else { setTotalLikes(0) }

        }
        userLikes()
        if (dateTime === "" || !dateTime) { return }
        setDate(dateTime.toDate().toDateString())
    }, [id])

    useEffect(() => {
        setNewAddedComment([])
    }, [showCommentPage])

    useEffect(() => {
        setLiked(isLiked)
    }, [isLiked])


    useEffect(() => {
        if (liked === isLiked) { return }
        changePostLike(id, liked)
        callLikePost(liked)
        console.log("LIKED, UID: ", uid);
        if (liked) { setTotalLikes(prev => { return prev += 1 }) }
        else { setTotalLikes(prev => { return prev -= 1 }) }
    }, [liked, uid])

    const callLikePost = async (val) => {
        console.log("CALLING LIKE POST, UID: ", uid);
        await likePost(uid, id, val, userId)
    }

    const handleLike = () => {
        setLiked(!liked)
    }

    const changeNewComment = (newComment) => {
        setNewAddedComment(newComment)
    }

    return (
        <div
            ref={wrapperCommentsRef}
            className={`comments-wrapper ${showCommentPage && "show-comments-page"}`}
            onClick={(e) => { removeCommentsPage(wrapperCommentsRef, e,) }}
        >
            <div className="comments-page">
                <div className="comments-contents">
                    <div className="post-contents">
                        <div className="post-info">
                            <ShowUser userId={userId} updateProfilePreview={updateProfilePreview} />
                            <h1 className="comment-title">{title}</h1>
                            <p className="comment-caption">{caption}</p>
                            <p className="comment-date">{date}</p>
                            <p className="post-likes">{totalLikes} {totalLikes == 1 ? "like" : "likes"}</p>
                            <FontAwesomeIcon icon={faHeart} className="comments-heart-icn"
                                style={liked ? { color: "#ef3a5d" } : {}}
                                onClick={() => { handleLike() }}
                            />
                        </div>
                        <img src={imageUrls} className="post-img comments-img" />

                    </div>


                    <CommentsContents postId={id} newAddedComment={newAddedComment} updateProfilePreview={updateProfilePreview} />
                    <CommentsInput uid={uid} initiatorId={userId} postId={id} changeNewComment={changeNewComment} />
                </div>

            </div>

        </div >

    )
}

export default CommentsPage