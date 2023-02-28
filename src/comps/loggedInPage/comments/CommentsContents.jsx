import { useEffect, useState } from 'react'

import { getPostComments } from '../../../apis/firestoreDataQueryFuncs'
import DisplayComment from './DisplayComment'





function CommentsContents({ postId }) {
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


    return (
        <>
            <div className="comments-sign"><h3>Comments</h3> <p>{totalComments}</p> </div>
            {Object.entries(comments).map(value => {
                console.log("VAL");
                const commentId = value[0]
                const comment = value[1]
                return <DisplayComment key={commentId} comment={comment} />
            })}
            {/* {Object.entries(comments).map((value) => {
                const commentUid = value[0]
                const commentArray = value[1]
            })} */}

            {/* <div className="comment-div">
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
                <div className="name-comment">
                    <p>Nathan Flores</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis feugiat tincidunt turpis a convallis.</p>
                </div>
            </div>
            <div className="comment-div">
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
                <div className="name-comment">
                    <p>Nathan Flores</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis feugiat tincidunt turpis a convallis.</p>
                </div>
            </div>
            <div className="comment-div">
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
                <div className="name-comment">
                    <p>Nathan Flores</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis feugiat tincidunt turpis a convallis.</p>
                </div>
            </div> */}
        </>


    )
}

export default CommentsContents