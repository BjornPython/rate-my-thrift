import Notification from "./Notification"

function Notifications() {

    const r = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="notification-page">
            <div className="notification-contents">
                <h3>NOTIFICATIONS</h3>
                <div className="notifications">
                    <hr />
                    {r.map((r) => {
                        return (<><Notification /> <hr /></>)
                    })}
                </div>
            </div>



        </div>
    )
}

export default Notifications