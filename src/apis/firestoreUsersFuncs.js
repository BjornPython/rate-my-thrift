import { usersCollection } from "../firebase";
import {  doc, setDoc } from "firebase/firestore";


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


    