import { useState } from "react"
import { addComment } from "../../../apis/firestoreDataQueryFuncs"
function CommentsInput({ uid, postId, changeNewComment, initiatorId }) {

    const [comment, setComment] = useState({ content: "" })
    const { content } = comment
    const handleCommentChange = (e) => {
        setComment(prevState => { return { ...prevState, [e.target.name]: e.target.value } })
    }

    const submitComment = async () => {
        console.log(uid, postId, content);
        const res = await addComment(uid, postId, content, initiatorId)
        if (res) {
            changeNewComment(prevState => { return [{ userId: uid, postId, content }, ...prevState] })
            setComment({ content: "" });
        }
    }

    return (
        <div className="comments-input">
            <input type="text" name="content" value={content}
                className="comment" onChange={handleCommentChange} />
            <p onClick={submitComment} >post</p>
        </div>
    )
}

export default CommentsInput