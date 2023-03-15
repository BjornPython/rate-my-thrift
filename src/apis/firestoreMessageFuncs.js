import { async } from "@firebase/util";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { chatsCollection, userChatsCollection, usersCollection } from "./firebase";
import {updated_at_timestamp} from "./firestoreDataQueryFuncs"

export const addUserChat = async (userId1, userId2) => {
    console.log("ADDING USER...");
    try {
        const user1ChatsDocRef = doc(userChatsCollection, userId1, "userIds", userId2)
        const user1ChatsDoc = await getDoc(user1ChatsDocRef)
        if (user1ChatsDoc.exists()) {throw {message: "chat exists", chatId: user1ChatsDoc.data().chatId}}
        const chatId = await createChat(userId1, userId2);
        console.log("CHAT ID: ", chatId);

        const userChats = await createUserChats(userId1, userId2, chatId);
    } catch (err) {throw err}
}


export const createUserChats = async (userId1, userId2, chatId) => {
    console.log("RECEIVED: ", userId1, userId2, chatId);
    try {
        const user1ChatsRef = doc(userChatsCollection, userId1, "userIds", userId2)
        console.log("SETTING NEW USER 1 CHAT");
        const newUser1Chat =  setDoc(user1ChatsRef, { chatId })

        const user2ChatsRef = doc(userChatsCollection, userId2, "userIds", userId1)
        console.log("SETTING NEW USER 1 CHAT");
        const newUser2Chat =  setDoc(user2ChatsRef, { chatId })
        
    
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