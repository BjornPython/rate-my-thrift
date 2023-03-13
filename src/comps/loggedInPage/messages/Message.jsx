
function Message({ type, message, isSending }) {
    return (
        <div className={`message ${type === "sent" && "msg-sent"}`}>
            <p>{message}</p>
            {isSending && <p className="sending-msg">sending...</p>}
        </div>

    )
}

export default Message