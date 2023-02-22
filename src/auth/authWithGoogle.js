import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";


const googleProvider = new GoogleAuthProvider()

export const callGoogleSigninPopup = async () => {
    const res = await signInWithPopup(auth, googleProvider)
    console.log("res: ", res);
}