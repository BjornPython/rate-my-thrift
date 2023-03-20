import { async } from "@firebase/util";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { chatsCollection, userChatsCollection, usersCollection } from "./firebase";
import {updated_at_timestamp} from "./firestoreDataQueryFuncs"

// Creates a user chat, and adds the chatId to user's userChats.
export const addUserChat = async (userId1, userId2) => {
    try {
        const user1ChatsDocRef = doc(userChatsCollection, userId1, "userIds", userId2)
        const user1ChatsDoc = await getDoc(user1ChatsDocRef)
        if (user1ChatsDoc.exists()) {throw {message: "chat exists", chatId: user1ChatsDoc.data().chatId}}
        const chatId = await createChat(userId1, userId2);
        const userChats = await createUserChats(userId1, userId2, chatId);
    } catch (err) {throw err}
}

// updates the user's userChats.
export const createUserChats = async (userId1, userId2, chatId) => {
    try {
        const user1ChatsRef = doc(userChatsCollection, userId1, "userIds", userId2)
        const newUser1Chat =  setDoc(user1ChatsRef, { chatId })
        const user2ChatsRef = doc(userChatsCollection, userId2, "userIds", userId1)
        const newUser2Chat =  setDoc(user2ChatsRef, { chatId })
    } catch(err) {throw err}
}

// Creates the chat document.
export const createChat = async (userId1, userId2) => {
    const chatDocRef = await addDoc(chatsCollection, {
        participants: [`${userId1}`, `${userId2}`],
        seen: {[userId1]: false, [userId2]: false},
        seen_by: [],
        lastEdited: updated_at_timestamp,
        lastMsg: ""
    })
    return chatDocRef.id
}

// Creates a "messages" subcollection and adds a message document with a unique id.
export const addMessage = async (chatId, senderId, content) => {
    const messageDocRef = collection(chatsCollection, chatId, "messages")
    const messageDoc = await addDoc(messageDocRef, {
        content,
        senderId,
        dateTime: updated_at_timestamp
    })
    if (messageDoc.id) {
        const chatsDoc = doc(chatsCollection, chatId)
        const updatedDoc = await updateDoc(chatsDoc, {lastMsg: content, seen_by: [senderId]})
    }
    return messageDoc.id
}   


// Gets the messages of a chatDocument from it's "messages" subcollection.
export const getMessages = async (chatId) => {
    const messageDocRef = collection(chatsCollection, chatId, "messages")
    const messageDocs = await getDocs(messageDocRef);
    return messageDocs
}

export const updateChatSeen = async (chatId, seenerId) => {
    try {
    const chatDocRef = doc(chatsCollection, chatId)
    const updatedDoc = await updateDoc(chatDocRef, {seen: arrayUnion(seenerId)})
    } catch(err) {throw err}
}