import { postsCollection, userUploadStorage } from "../firebase";
import { doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

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

export const getImages = async () => {
    try{
            const imageRef = ref(userUploadStorage, "userId/userPosts/demo.jpg")
            const imageUrl = await getDownloadURL(imageRef)
            console.log("IMAGE URL: ", imageUrl);
    } catch(err) {console.log(err)}

}

export const uploadImage = async (image) => {
    console.log("IMAGE: ", image);

    let type = image.split(".").pop()
    console.log("TYPE: ", type);
    if (type !== "jpg" && type !== "png") {console.log("WRONG FILE TYPE"); return }
    console.log(`image/${type == "jpg" ? "jpeg" : "png"}`);
    try{
        const folderRef = ref(userUploadStorage, `userId/userPosts/uploadimagetest.${type}`)
        // const metadata = {
        //     contentType: `image/${type == "jpg" ? "jpeg" : "png"}`,
        //   };
          
        const result = await uploadBytes(folderRef, image)
        console.log("UPLOAD RESULT: ", result);
    }
    catch(err) {console.log(err);}

}