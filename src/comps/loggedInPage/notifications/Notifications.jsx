import Notification from "./Notification"
import { useMemo } from "react"

function Notifications({ uid, notifs, showNotif, changeCommentPost }) {


    const notificationsMemo = useMemo(() => {
        console.log("NOTIFS: ", notifs);
        const notifications = notifs.map((notif) => {
            const notifData = notif.data()
            return (<div key={notif.id}><Notification notif={notifData} changeCommentPost={changeCommentPost} /> <hr /></div>)
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