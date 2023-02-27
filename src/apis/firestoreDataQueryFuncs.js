import { postsCollection, userUploadStorage, commentsCollection, usersCollection, postLikesCollection } from "./firebase";
import { doc,getDoc, getDocs, setDoc, addDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const updated_at_timestamp = serverTimestamp()

export const getPosts = async () => {
    try {
        const docs = await getDocs(postsCollection)
        let posts = []
        docs.forEach(doc => { posts.push({...doc.data(), id: doc.id}); })
        console.log("POST IN FUNC: ", posts);
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
    console.log("DOC: ", documentExists.data());  

    if (documentExists.data()) {
        const newPostLikes = await updateDoc(postLikesDoc, {
            [`likes.${userId}`]: {isLiked, dateTime: updated_at_timestamp}
        }, {merge: true}
        ) 

    } else {
        const newPostLikes = await setDoc(postLikesDoc, {
            [`likes.${userId}`]: {isLiked, dateTime: updated_at_timestamp}
        }, {merge: true}
        ) 
    }

}



// export const addComment = async (content, userId) => {
//     const commentDoc = doc(commentsCollection)
//     try {
//         const newComment = await setDoc(commentDoc, {

//         })

//     }
// }