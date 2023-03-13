import { async } from "@firebase/util";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { chatsCollection, userChatsCollection, usersCollection } from "./firebase";
import {updated_at_timestamp} from "./firestoreDataQueryFuncs"

export const addUserChat = async (userId1, userId2) => {

    const user1ChatsDocRef = doc(userChatsCollection, userId1);
    const user2ChatsDocRef = doc(userChatsCollection, userId2);
    const chatId = await createChat(userId1, userId2);
    const updatedUser1Chat = await updateDoc(user1ChatsDocRef, {
        chatIds: arrayUnion(chatId)
    })

    const updatedUser2Chat = await updateDoc(user2ChatsDocRef, {
        chatIds: arrayUnion(chatId)
    })
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