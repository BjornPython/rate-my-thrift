
function Message({ type, message }) {
    return (
        <div className={`message ${type === "sent" && "msg-sent"}`}>
            <p>{message}</p>
        </div>
    )
}

export default Message