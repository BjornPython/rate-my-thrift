import { usersCollection, notifCollection, userChatsCollection } from "./firebase";
import {  doc, setDoc, getDoc,addDoc } from "firebase/firestore";
import { uploadImage } from "./firestoreDataQueryFuncs";

// Initializes the user's firestore documents.
export const addUser = async (uid, email) => {
    try {
        const userDoc = doc(usersCollection, uid)  
        const user = await getDoc(userDoc)
        if (user.exists()) {return}
        const newUser = await setDoc(userDoc, {
            name: email,
            dpURL: null,
            email,
            bio: "",
            posts: []
        })
        const userNotifRef = doc(notifCollection, uid)
        const newNotif = await setDoc(userNotifRef, {seen: true})
        const userChatsRef =  doc(userChatsCollection, uid)
        const userChats = await setDoc(userChatsRef, {})
    } catch(err) {throw err}
}   

// Used for adding user's display picture.
export const addDp = async (image, userId) => {
    try {
            const dpURL = await uploadImage(image, userId, false);
        const userDoc = doc(usersCollection, userId)
        const updatedUserDoc = await setDoc(userDoc, {dpURL}, { merge: true });
        return updatedUserDoc
    } catch (err) {throw err}
}

// Gets the user's info. used for getting dpURL, name, bio.
export const getUserInfo = async (uid) => {
    try{
        const userDoc = doc(usersCollection, uid)  
        const document = await getDoc(userDoc);
        return document.data()
    } catch(err) {console.log(err);}

}


    
// Edits the user info, used for updating name, bio, dpURL
export const editUserInfo = async (userId, newInfo) => {
    try {
        const userDoc = doc(usersCollection, userId) 
        await setDoc(userDoc, newInfo, {merge: true})
        return true
    } catch(err) {console.log(err); throw err}
}