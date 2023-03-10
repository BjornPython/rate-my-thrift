import { async } from "@firebase/util";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { chatsCollection, userChatsCollection, usersCollection } from "./firebase";
import {updated_at_timestamp} from "./firestoreDataQueryFuncs"

export const addUserChat = async (userId1, userId2) => {
    // const user1ChatsDocRef = doc(userChatsCollection, userId1);
    // const user2ChatsDocRef = doc(userChatsCollection, userId2);
    const users = await getDocs(userChatsCollection);
    users.forEach(doc => {
        console.log("DOC: ", doc.id === userId1)
    })
    // const chatId = await createChat(userId1, userId2);
    // console.log("CHATID: ", chatId);
    // const updatedUser1Chat = await updateDoc(user1ChatsDocRef, {
    //     chats: arrayUnion(chatId)
    // })

    // const updatedUser2Chat = await updateDoc(user2ChatsDocRef, {
    //     chats: arrayUnion(chatId)
    // })
}


export const createChat = async (userId1, userId2) => {
    const chatDocRef = await addDoc(chatsCollection, {
        participants: [`${userId1}`, `${userId2}`],
        seen: {[userId1]: false, [userId2]: false}
    })
    return chatDocRef.id
}

export const addMessage = async (chatId, senderId, content) => {
    const messageDocRef = collection(chatsCollection, chatId, "messages")
    
    const messageDoc = await addDoc(messageDocRef, {
        content,
        senderId,
        dateTime: updated_at_timestamp
    })
    return messageDoc.id
}   

export const getMessages = async (chatId) => {
    const messageDocRef = collection(chatsCollection, chatId, "messages")
    const messageDocs = await getDocs(messageDocRef);
    return messageDocs

}