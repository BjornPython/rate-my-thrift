import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../apis/firebase";
import { addUser } from "../apis/firestoreUsersFuncs";

const googleProvider = new GoogleAuthProvider()

export const callGoogleSigninPopup = async () => {
    const res = await signInWithPopup(auth, googleProvider)
    console.log("RES: ", res);
    const {uid, email } = res.user
    await addUser(uid, email)
}