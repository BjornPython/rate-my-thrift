
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, sendEmailVerification
    } from "firebase/auth"


export const register = async (email, password) => {
    try {
        
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("USER: ", user);
        sendEmailVerification(auth.currentUser)

    } catch (err) {
        console.log(err.message);
    }
}

export const loginWithEmailPass = async (email, password) => {
    try {
    const user = signInWithEmailAndPassword(auth, email, password)
    } catch (err) {console.log(err)}
}   

