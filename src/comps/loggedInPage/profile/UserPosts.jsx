import Post from "../Post"

function UserPosts({ handlePostClick, updateLike, uid }) {
    const post = { caption: "TEST CAPTION", title: "JUST A TITLE", imageUrls: "https://firebasestorage.googleapis.com/v0/b/rate-my-thrift.appspot.com/o/userUploads%2F83LtPLmHrMdUto3hamWfl8nC33x1%2FuserPosts%2Fbackground.jpg?alt=media&token=0588c422-d84b-403d-9f32-0122637ab3f5" }
    return (
        <div className="profile-posts">
            <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
            <Post handlePostClick={handlePostClick} updateLike={updateLike} uid={uid} post={post} />
        </div>
    )
}

export default UserPosts