import Message from "./Message"
function Messages({ uid, chatMessages }) {

    const messages = [
        { type: "received", message: "Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
        { type: "received", message: "Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
        { type: "received", message: "Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
        { type: "received", message: "Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
        { type: "received", message: " Hey bro whats up? Hey bro whats up? Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
        { type: "received", message: "Hey bro whats up?" },
        { type: "sent", message: "Hey bro whats up?" },
    ]

    return (
        <div className="messages ">

            {chatMessages.map(msg => {
                const { senderId, content } = msg.data()
                return <Message key={msg.id} type={uid === senderId ? "sent" : "received"} message={content} />
            })}
            {/* <Message /> */}
        </div>
    )
}

export default Messages