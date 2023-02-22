import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { addUser } from "../apis/firestoreUsersFuncs";

const googleProvider = new GoogleAuthProvider()

export const callGoogleSigninPopup = async () => {
    const res = await signInWithPopup(auth, googleProvider)
    console.log("res: ", res);
    const addUserRes = await addUser(res.user.uid, res.user.email)
    console.log("ADD USER RES: ", addUserRes);
}