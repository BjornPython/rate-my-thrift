import { postsCollection } from "../firebase";
import { doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";

const updated_at_timestamp = serverTimestamp()

export const getPosts = () => {
    getDocs(postsCollection)
    .then((snapshot) => {
        const docs =  snapshot.docs
        docs.forEach(doc => {console.log("DATA: ", doc.data());})
    })
    .catch(err => {console.log(err.message)})
}

export const addPost = async (caption, imageUrls, title, userId) => {
    const newDoc = doc(postsCollection)
    try{
            const newPost = await setDoc(newDoc, {
            caption,
            title,
            userId,
            imageUrls,
            dateTime: updated_at_timestamp

    })
    } catch(err) {console.log(err)}
}