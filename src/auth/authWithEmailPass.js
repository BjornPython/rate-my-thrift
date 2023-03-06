
import { auth } from "../apis/firebase";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification
    } from "firebase/auth"

import { addUser } from "../apis/firestoreUsersFuncs";


export const registerWithEmailPass = async (email, password) => {
    try {
        
        const res = await createUserWithEmailAndPassword(auth, email, password);
        sendEmailVerification(auth.currentUser)
        console.log("res: ", res);
        const addUserRes = await addUser(res.user.uid, res.user.email)
        console.log("ADD USER RES: ", addUserRes);
    } catch (err) {
        console.log(err.message, "RETURNING ERR");
        throw err
    }
}

export const loginWithEmailPass = async (email, password) => {
    try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {throw(err)}
}   

