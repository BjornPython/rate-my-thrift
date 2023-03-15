import Message from "./Message"
import { useEffect, useRef } from "react";
function Messages({ uid, chatMessages, sendingMessages }) {

    const messagesRef = useRef(null)

    useEffect(() => {
        if (!messagesRef) { return }
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [chatMessages])


    return (
        <div className="messages" ref={messagesRef}>

            {chatMessages.map(msg => {
                const { senderId, content } = msg.data()
                return <Message key={msg.id} type={uid === senderId ? "sent" : "received"} message={content} />
            })}

            {Object.entries(sendingMessages).map(msg => {
                return <Message key={msg[0]} type="sent" message={msg[1]} isSending={true} />
            })}
            {/* <Message /> */}
        </div>
    )
}

export default Messages