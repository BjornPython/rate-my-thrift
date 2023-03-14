import { async } from "@firebase/util";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { chatsCollection, userChatsCollection, usersCollection } from "./firebase";
import {updated_at_timestamp} from "./firestoreDataQueryFuncs"

export const addUserChat = async (userId1, userId2) => {
    console.log("ADDING USER...");
    try {
        const userChatsRef = doc(userChatsCollection, userId1)
        const user1Chats = await getDoc(userChatsRef)
        console.log("RES: ", user1Chats.data().chatIds[userId2]);
        if (user1Chats.data().chatIds[userId2]) {throw "already has chat"}

        const user1ChatsDocRef = doc(userChatsCollection, userId1);
        const user2ChatsDocRef = doc(userChatsCollection, userId2);
        const chatId = await createChat(userId1, userId2);

        const userChats = createUserChats(userId1, userId2, chatId)
    } catch (err) {throw err}
}


export const createUserChats = async (userId1, userId2, chatId) => {

    try {
        const user1ChatsRef = doc(userChatsCollection, userId1, "userIds", userId2)
        const newUser1Chat = await addDoc(user1ChatsRef, { chatId })

        const user2ChatsRef = doc(userChatsCollection, userId2, "userIds", userId1)
        const newUser2Chat = await addDoc(user2ChatsRef, { chatId })
        
        return true
    
    } catch(err) {throw err}
    

}


export const createChat = async (userId1, userId2) => {
    const chatDocRef = await addDoc(chatsCollection, {
        participants: [`${userId1}`, `${userId2}`],
        seen: {[userId1]: false, [userId2]: false},
        lastEdited: updated_at_timestamp,
        lastMsg: ""
    })
    return chatDocRef.id
}

export const addMessage = async (chatId, senderId, content) => {
    console.log("RECEIVED: ", chatId, senderId, content);

    const messageDocRef = collection(chatsCollection, chatId, "messages")
    console.log("REF: ", messageDocRef);
    const messageDoc = await addDoc(messageDocRef, {
        content,
        senderId,
        dateTime: updated_at_timestamp
    })
    console.log("MSGDOC RES: ", messageDocRef);
    if (messageDoc.id) {
        const chatsDoc = doc(chatsCollection, chatId)
        const updatedDoc = await updateDoc(chatsDoc, {lastMsg: content})
    }
    console.log("RES: ", messageDoc.id);
    return messageDoc.id
}   

export const getMessages = async (chatId) => {
    const messageDocRef = collection(chatsCollection, chatId, "messages")
    const messageDocs = await getDocs(messageDocRef);
    return messageDocs

}