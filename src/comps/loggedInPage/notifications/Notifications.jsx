import Notification from "./Notification"
import { useMemo } from "react"

function Notifications({ uid, notifs, showNotif, changeCommentPost }) {


    const notificationsMemo = useMemo(() => {
        console.log("NOTIFS: ", notifs);
        const notifications = Object.entries(notifs).map((vals) => {
            const notifId = vals[0]
            const notif = vals[1]
            return (<div key={notifId}><Notification notif={notif} changeCommentPost={changeCommentPost} /> <hr /></div>)
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
                </div>
            </div>



        </div>
    )
}

export default Notifications