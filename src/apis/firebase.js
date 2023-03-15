// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, signOut
    } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore";
import {getStorage, ref} from "firebase/storage";


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

export const firestoreDb = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export const usersCollection = collection(firestoreDb, "users") // Used for storing user info. (name, bio, dpURL, posts)
export const postsCollection = collection(firestoreDb, "posts") // Used for storing posts
export const commentsCollection = collection(firestoreDb, "postComments") // Used for storing post comments
export const postLikesCollection = collection(firestoreDb, "postLikes")// Used for storing post likes
export const userUploadStorage = ref(storage, "userUploads") // storage for storing userDps and userUploaded pictures
export const notifCollection = collection(firestoreDb, "notifications") // Used for storing user notifications
export const userChatsCollection = collection(firestoreDb, "userChats") // Used for storing user's chatIds
export const chatsCollection = collection(firestoreDb, "chats") // Used for storing chat info (participants, seen) and messages in it's subcollection "messages"


// Logouts the user.
export const logout = async () => {
    await signOut(auth)
}

