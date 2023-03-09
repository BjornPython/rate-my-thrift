import Notification from "./Notification"
import { useMemo } from "react"

function Notifications({ uid, notifs, showNotif }) {


    const notificationsMemo = useMemo(() => {

        const notifications = Object.entries(notifs).map((vals) => {
            const notifId = vals[0]
            const notif = vals[1]
            return (<div key={notifId}><Notification type={notif.type} initiatorId={notif.initiatorId} /> <hr /></div>)
        })

        return notifications

    }, [notifs])


    return (
        <div className={`notification-page ${showNotif && "notification-page-show"}`} >
            <div className="notification-contents">
                <h3>NOTIFICATIONS</h3>
                <div className="notifications">
                    <hr />
                    {notificationsMemo}
                    {/* <button onClick={() => { addNotif("iuid", "uid3", "postId3", "like3", "march3") }}>ADD NOTIF</button> */}
                </div>
            </div>



        </div>
    )
}

export default Notifications