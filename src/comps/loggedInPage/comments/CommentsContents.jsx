import React from 'react'
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function CommentsContents() {
    return (
        <>
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
            </div>
            <div className="comment-div">
                <FontAwesomeIcon icon={faCircle} className="comment-user-icn" />
                <div className="name-comment">
                    <p>Nathan Flores</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis feugiat tincidunt turpis a convallis.</p>
                </div>
            </div>
        </>


    )
}

export default CommentsContents