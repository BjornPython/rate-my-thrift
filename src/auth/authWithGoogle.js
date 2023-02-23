import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { addUser } from "../apis/firestoreUsersFuncs";

const googleProvider = new GoogleAuthProvider()

export const callGoogleSigninPopup = async () => {
    const res = await signInWithPopup(auth, googleProvider)

}