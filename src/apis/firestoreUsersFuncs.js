import { usersCollection } from "./firebase";
import {  doc, setDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";


export const addUser = async (uid, email) => {
    const userDoc = doc(usersCollection, uid)  
    console.log("SETTING DOC...");
    const newUser = await setDoc(userDoc, {
        email,
        bio: "test bio val",
        posts: ["postOne", "postTwo", "postThree"]
    })
    console.log("NEW USER: ", newUser);
}   

export const getUserInfo = async (uid) => {
    const userDoc = doc(usersCollection, uid)  
    try{
            const document = await getDoc(userDoc);
            console.log("USER DATA: ", document);
            return document.data()
    } catch(err) {console.log(err);}

}


    