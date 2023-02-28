import "../../../css/loggedIn/comments/commentsPage.css"
import ShowUser from "./ShowUser"
import CommentsInput from "./CommentsInput"
import CommentsContents from "./CommentsContents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRef, useEffect, useState } from "react"
import { getPostLikes } from "../../../apis/firestoreDataQueryFuncs"
import { likePost } from "../../../apis/firestoreDataQueryFuncs"

function CommentsPage({ uid, showCommentPage, commentPost, removeCommentsPage, changePostLike }) {
    const wrapperCommentsRef = useRef()
    const { id, imageUrls, title, caption, dateTime, isLiked } = commentPost
    const [totalLikes, setTotalLikes] = useState(0)
    const [date, setDate] = useState("")
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const userLikes = async () => {
            if (!id) { return }
            const likesCount = await getPostLikes(id)
            if (likesCount) { setTotalLikes(likesCount.postLikes) }
            else { setTotalLikes(0) }

        }
        userLikes()
        if (dateTime === "") { return }
        console.log("DATETIME: ", dateTime.toDate().toDateString());
        setDate(dateTime.toDate().toDateString())
    }, [id])

    useEffect(() => {
        setLiked(isLiked)
    }, [isLiked])


    const callLikePost = async (val) => {
        await likePost(uid, id, val)
    }

    const handleLike = () => {
        setLiked(!liked)
    }

    useEffect(() => {
        if (liked === isLiked) { return }
        changePostLike(id, liked)
        callLikePost(liked)
        if (liked) { setTotalLikes(prev => { return prev += 1 }) }
        else { setTotalLikes(prev => { return prev -= 1 }) }
    }, [liked])

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
                            <p className="comment-date">{date}</p>
                            <p className="post-likes">{totalLikes} {totalLikes == 1 ? "like" : "likes"}</p>
                            <FontAwesomeIcon icon={faHeart} className="comments-heart-icn"
                                style={liked ? { color: "#ef3a5d" } : {}}
                                onClick={() => { handleLike() }}
                            />
                        </div>
                        <img src={imageUrls} className="post-img comments-img" />

                    </div>


                    <CommentsContents postId={id} />
                    <CommentsInput uid={uid} postId={id} />
                </div>

            </div>

        </div >

    )
}

export default CommentsPage