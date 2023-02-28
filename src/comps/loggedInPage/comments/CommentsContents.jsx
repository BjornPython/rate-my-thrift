import { useEffect, useState } from 'react'
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getPostComments } from '../../../apis/firestoreDataQueryFuncs'

const displayComment = (dp, name, content, date) => {
    <div className="comment-div">
        <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
        <div className="name-comment">
            <p>{name}</p>
            <p>{content}</p>
        </div>
    </div>
}


function CommentsContents({ postId }) {

    const [comments, setComments] = useState({})

    useEffect(() => {
        if (postId === "") { return }
        const queryPostComments = async () => {
            const res = await getPostComments(postId)
            console.log(res);
            setComments(res.comments)
        }
        queryPostComments()
    }, [postId])


    return (
        <>
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