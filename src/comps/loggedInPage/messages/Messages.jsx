import Message from "./Message"
function Messages({ }) {

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

            {messages.map(msg => {
                return <Message type={msg.type} message={msg.message} />
            })}
            {/* <Message /> */}
        </div>
    )
}

export default Messages