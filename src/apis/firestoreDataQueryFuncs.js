import { postsCollection, userUploadStorage, commentsCollection, usersCollection, postLikesCollection } from "./firebase";
import 
    { 
        doc,getDoc, getDocs, setDoc, addDoc, 
        updateDoc, serverTimestamp, increment, 
        deleteField, arrayUnion, arrayRemove
    } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

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

export const addPost = async (userId, caption, imageUrls, title) => {
    const newDoc = doc(postsCollection)
    try {
        const newPost = await setDoc(newDoc, {
            caption,
            title,
            userId,
            imageUrls,
            dateTime: updated_at_timestamp
        })
        console.log("NEW POST .. : ", newPost);
        return newPost

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
    const path = post ? `${userId}/userPosts/${image.name}` : `${userId}/userDp.${image.name.split(".")[1]}`
    try{
        const folderRef = ref(userUploadStorage, path)
        const result = await uploadBytes(folderRef, image)
        console.log("UPLOAD RESULT: ", result);
        const imageURL = await getDownloadURL(result.ref)
        console.log("RES URL: ", imageURL );
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
        
        console.log("IMAGE URL: ", imageURL);
        return imageURL
        
} catch(err) {console.log(err)}
}

export const addDp = async (image, userId) => {
    const dpURL = await uploadImage(image, userId, false);
    console.log("DP URL RES: ", dpURL);
    const userDoc = doc(usersCollection, userId)
    console.log("UPDATING USER DOC MERGE IS TRUE...");
    const updatedUserDoc = await setDoc(userDoc, {dpURL}, { merge: true });
    console.log("UPDATED DOC RES: ", updatedUserDoc);
    return updatedUserDoc
}

export const likePost = async (userId, postId, isLiked) => {
    const postLikesDoc = doc(postLikesCollection, postId)
    const documentExists = await getDoc(postLikesDoc);
    if (documentExists.data()) {
        console.log("updating doc with id: ", userId);
        const newPostLikes = await updateDoc(postLikesDoc, {
            postLikes: isLiked ? incrementVal : decrementVal,
            [`likes.${userId}`]: isLiked ? {isLiked, dateTime: updated_at_timestamp} : deleteField()
        }, {merge: true}
        ) 
    } else {
        const newPostLikes = await setDoc(postLikesDoc, {
            postLikes: 1,
            likes:{
            [userId]: {isLiked, dateTime: updated_at_timestamp}
        }
        }, {merge: true}
        ) 
    }
}

export const getPostLikes = async (postId) => {
    const postLikesDoc = doc(postLikesCollection, postId)
    const document = await getDoc(postLikesDoc);
    return document.data()
}


export const addComment = async (userId, postId, content) => {
    console.log("IDl ", userId);
    const commentDoc = doc(commentsCollection, postId)
    const documentExists = await getDoc(commentDoc);
    const dateTime = new Date()
    if (documentExists.data()) {
        if (documentExists[userId]) {
            const newComment = await updateDoc(commentDoc, {
                [`comments.${userId}`]: arrayUnion({content, dateTime})
            })
        }
        else {
                const newComment = await setDoc(commentDoc, {
                [`comments.${userId}`]: [{content, dateTime}]
            }, {merge: true})
        }
    } else {
        const newComment = await setDoc(commentDoc, {
            totalComments: 1,
            comments: {
            [userId]:  [{content, dateTime}]
            }
        })
    }



}

export const getPostComments = async (postId) => {
    const postCommentDoc = doc(commentsCollection, postId)
    const document = await getDoc(postCommentDoc)
    return document.data()
}