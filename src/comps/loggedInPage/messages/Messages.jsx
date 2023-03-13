import Message from "./Message"
function Messages({ uid, chatMessages, sendingMessages }) {



    return (
        <div className="messages ">

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