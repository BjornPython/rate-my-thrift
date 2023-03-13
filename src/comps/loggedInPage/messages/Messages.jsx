import Message from "./Message"
function Messages({ uid, chatMessages, sendingMessages }) {



    return (
        <div className="messages ">

            {chatMessages.map(msg => {
                const { senderId, content } = msg.data()
                return <Message key={msg.id} type={uid === senderId ? "sent" : "received"} message={content} />
            })}

            {Object.entries(sendingMessages).map(msg => {
                console.log("MSG: ", msg);
                return <Message type="sent" message={key[1]} />
            })}
            {/* <Message /> */}
        </div>
    )
}

export default Messages