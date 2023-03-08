import { usersCollection, notifCollection } from "./firebase";
import {  doc, setDoc, getDoc } from "firebase/firestore";
import { uploadImage } from "./firestoreDataQueryFuncs";

export const addUser = async (uid, email) => {
    const userDoc = doc(usersCollection, uid)  
    console.log("SETTING DOC...");
    const newUser = await setDoc(userDoc, {
        name: email,
        dpURL: null,
        email,
        bio: "",
        posts: []
    })
    const userNotifRef = doc(notifCollection, uid)
    const newNotif = await setDoc(userNotifRef, {notifications: []})
    console.log("NEW USER: ", newUser);
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


export const getUserInfo = async (uid) => {
    const userDoc = doc(usersCollection, uid)  
    try{
            const document = await getDoc(userDoc);
            return document.data()
    } catch(err) {console.log(err);}

}


    

export const editUserInfo = async (userId, newInfo) => {
    const userDoc = doc(usersCollection, userId) 
console.log("NEW INFO: ", newInfo);
    try {
        await setDoc(userDoc, newInfo, {merge: true})

    } catch(err) {console.log(err);}
}