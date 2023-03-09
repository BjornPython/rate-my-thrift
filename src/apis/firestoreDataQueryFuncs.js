import { postsCollection, userUploadStorage, commentsCollection, 
    usersCollection, postLikesCollection, firestoreDb, notifCollection } from "./firebase";
import 
    { 
        doc,getDoc, getDocs, setDoc, addDoc, 
        updateDoc, serverTimestamp, increment, 
        deleteField, arrayUnion, arrayRemove, 
        collection, onSnapshot
    } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";


const updated_at_timestamp = serverTimestamp()
const incrementVal = increment(1);
const decrementVal = increment(-1);

export const getPosts = async () => {
    try {
        const docs = await getDocs(postsCollection)
        let posts = []
        docs.forEach(doc => { posts.push({...doc.data(), id: doc.id}); })
        return posts
    } catch(err) {console.log(err);}
}


export const getPost = async (postId) => {
    const document = doc(postsCollection, postId)
    try {
        const post = await getDoc(document)
        return {...post.data(), id: post.id}
    } catch(err) {console.log(err);}
}

export const addNotif = async (userId, initiatorId,  postId, type) => {
    const docRef = doc(notifCollection, userId)
    const notifId = uuidv4()
    const dateTime = updated_at_timestamp
    try {

        const updatedDoc = await updateDoc(docRef, {
            seen: false, 
            [`notifications.${notifId}`]: {initiatorId,  postId, type, dateTime}
            
        })

        console.log("UPDATED DOC: ", updatedDoc);
    } catch(err) {throw err}
} 

export const updateNotifSeen = async (uid, val) => {
    const docRef = doc(notifCollection, uid);
    try {
        const notifDoc = await updateDoc(docRef, {seen: val})
        return true
    } catch (err ) {throw err}
} 

export const listenNewNotifs = async (uid) => {
    try {
        const notifRef = doc(notifCollection, uid);
        const notifDoc = await getDoc(notifRef)
        if (notifDoc.exists()) {
                const unsub = onSnapshot(doc(notifCollection, uid), (doc) => {return doc.data()})
        } 
    } catch (err) {throw err}
}

export const addPost = async (userId, caption, imageUrls, title) => {
    try {
        // Add post doc un posts
        const newPost = await addDoc(collection(firestoreDb, "posts"), {
            caption,
            title,
            userId,
            imageUrls,
            dateTime: updated_at_timestamp
        })

        // update user posts
        const userDoc = doc(usersCollection, userId)
        const newUserPosts = await updateDoc(userDoc, {
            posts: arrayUnion(newPost.id)
        })
        return "added post"
    } catch(err) {console.log(err); throw(err)}
}

export const getImages = async (userId, imageName) => {
    try{
            const imageRef = ref(userUploadStorage, `${userId}/userPosts/${imageName}`)
            const imageURL = await getDownloadURL(imageRef)
            console.log("IMAGE URL: ", imageURL);
            return imageURL
    } catch(err) {console.log(err)}
}



export const uploadImage = async (image, userId="userId", post=true) => {
    console.log("RECEIVED IMAGE JSON: ", image);
    const path = post ? `${userId}/userPosts/${image.name}` : `${userId}/userDp.${image.name.split(".")[1]}`
    try{
        const folderRef = ref(userUploadStorage, path)
        const result = await uploadBytes(folderRef, image)
        const imageURL = await getDownloadURL(result.ref)
        return imageURL
    }
    catch(err) {console.log(err); throw(err)}
}

export const uploadPost = async (userId, title, caption, image) => {
    try {
        console.log("UPLOADING IMAGE...");
        const imageURL = await uploadImage(image, userId)
        if (imageURL) {
               console.log("IMAGE URL RECEIVED, CREATING POST DOC...");
            const newPost = await addPost(userId, caption, imageURL, title) 
            console.log("NEW POST: ", newPost);
            return "post added."
        } 
    } catch (err) {console.log(err);}
}

export const getDp = async (imageName, userId) => {
    try{
        let imageRef = ref(userUploadStorage, `${userId}/${imageName}.jpg`)
        let imageURL = await getDownloadURL(imageRef)
        if (!imageURL) {
            imageRef = ref(userUploadStorage, `${userId}/${imageName}.png`)
            imageURL = await getDownloadURL(imageRef)
        }
        return imageURL
        
} catch(err) {console.log(err)}
}


export const likePost = async (initiatorId, postId, isLiked, userId) => {
    const postLikesDoc = doc(postLikesCollection, postId)
    const documentExists = await getDoc(postLikesDoc);
    if (documentExists.data()) {
        console.log("updating doc with id: ", userId);
        const newPostLikes = await updateDoc(postLikesDoc, {
            postLikes: isLiked ? incrementVal : decrementVal,
            [`likes.${userId}`]: isLiked ? {isLiked, dateTime: updated_at_timestamp} : deleteField()
        }, {merge: true}
        ) 
        {isLiked && await addNotif(userId, initiatorId, postId, "liked")}
    } else {
        const newPostLikes = await setDoc(postLikesDoc, {
            postLikes: 1,
            likes:{
            [userId]: {isLiked, dateTime: updated_at_timestamp}
        }
        }, {merge: true}
        ) 
        {isLiked && await addNotif(userId, initiatorId, postId, "liked")}

    }
}

export const getPostLikes = async (postId) => {
    const postLikesDoc = doc(postLikesCollection, postId)
    const document = await getDoc(postLikesDoc);
    return document.data()
}


export const addComment = async (userId, postId, content, initiatorId) => {
    console.log("IDl ", userId);
    try {
            const commentDoc = doc(commentsCollection, postId)
        const document = await getDoc(commentDoc);
        const dateTime = new Date()
        const commentId = uuidv4()
        if (document.exists()) {
            const updatedComment = await updateDoc(commentDoc, {
                totalComments: incrementVal,
                [`comments.${commentId}`]: {content, dateTime, userId}
            })
            await addNotif(userId, initiatorId, postId, "commented on")
            return document.id
        } else {
            const newComment = await setDoc(commentDoc, {
                totalComments: 1,
            "comments": {[commentId]: {content, dateTime, userId}}
            }, {merge: true})
            await addNotif(userId, initiatorId, postId, "commented on")
            return commentId
        }
        
    } catch (err) {console.log(err);}


}

export const getPostComments = async (postId) => {
    const postCommentDoc = doc(commentsCollection, postId)
    const document = await getDoc(postCommentDoc)
    return document.data()
}
