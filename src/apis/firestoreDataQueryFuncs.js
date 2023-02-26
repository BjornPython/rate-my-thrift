import { postsCollection, userUploadStorage } from "../firebase";
import { doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
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
        if (newPost) {return  "success"}

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


export const uploadImage = async (image,userId="userId", post=true) => {
    try{
        const folderRef = ref(userUploadStorage, `${userId}/${post ? "userPosts" : "userProfilePic"}/${image.name}`)
        const result = await uploadBytes(folderRef, image)
        console.log("UPLOAD RESULT: ", result);
        const imageURL = await getDownloadURL(result.ref)
        console.log("RES URL: ", imageURL );
        return imageURL
    }
    catch(err) {console.log(err); throw(err)}
}

export const uploadPost = async (userId, title, caption, image, post=true ) => {
    try {
        console.log("UPLOADING IMAGE...");
        const imageURL = await uploadImage(image, userId)
        if (imageURL) {
               console.log("IMAGE URL RECEIVED, CREATING POST DOC...");
            const newPost = await addPost(userId, caption, imageURL, title) 
            return "post added."
        } 
    }catch (err) {console.log(err);}

}