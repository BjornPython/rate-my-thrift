import { useEffect, useState } from 'react'

import { getPostComments } from '../../../apis/firestoreDataQueryFuncs'
import DisplayComment from './DisplayComment'





function CommentsContents({ postId, newAddedComment }) {
    const [totalComments, setTotalComments] = useState(0)
    const [comments, setComments] = useState({})

    useEffect(() => {
        setComments({})
        setTotalComments(0)
        if (postId === "" || !postId) { return }
        const queryPostComments = async () => {
            const res = await getPostComments(postId)
            if (res) { setComments(res.comments); setTotalComments(res.totalComments) }
        }
        queryPostComments()
    }, [postId])


    useEffect(() => {
        console.log("NEW: ", newAddedComment);
    }, [newAddedComment])

    return (
        <>
            <div className="comments-sign"><h3>Comments</h3> <p>{totalComments}</p> </div>
            <DisplayComment key={"newAddedComment"} comment={newAddedComment} />

            {Object.entries(comments).map(value => {
                console.log("VAL");
                const commentId = value[0]
                const comment = value[1]
                return <DisplayComment key={commentId} comment={comment} />
            })}

        </>


    )
}

export default CommentsContents