import "../../../css/loggedIn/comments/commentsPage.css"

function CommentsPage({ showCommentPage }) {

    const post = {
        imageUrls: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2F83LtPLmHrMdUto3hamWfl8nC33x1%2FuserPosts%2Fdemo4.jpg?alt=media&token=8678661e-cf6d-4714-83dc-0643541a7513",
        title: "#GreatFind",
        caption: "You just have to look when thrifting."
    }

    const { imageUrls, title, caption } = post
    return (
        <div className={`comments-page ${showCommentPage && "show-comments-page"}`}>

            <div className="post-contents">
                <div className="post-info">

                </div>
            </div>



            <img src={post.imageUrls} className="post-img" />
        </div>
    )
}

export default CommentsPage