// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, onAuthStateChanged, 
    signOut, sendEmailVerification
    } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDZYCISHCL2E_wiqYmhGjx5Wo2MrCgN6s",
  authDomain: "rate-my-thrift.firebaseapp.com",
  projectId: "rate-my-thrift",
  storageBucket: "rate-my-thrift.appspot.com",
  messagingSenderId: "479739935854",
  appId: "1:479739935854:web:ba8adac628ed7e67823a7f"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true
}
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

export const logout = async () => {
    await signOut(auth)
}