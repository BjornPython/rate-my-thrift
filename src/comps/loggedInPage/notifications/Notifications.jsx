import Notification from "./Notification"
import { addNotif } from "../../../apis/firestoreDataQueryFuncs"
import { notifCollection } from "../../../apis/firebase"
import { onSnapshot } from "firebase/firestore"
import { listenNewNotifs } from "../../../apis/firestoreDataQueryFuncs"
import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"

function Notifications({ uid, notifs }) {





    return (
        <div className="notification-page">
            <div className="notification-contents">
                <h3>NOTIFICATIONS</h3>
                <div className="notifications">
                    <hr />
                    {Object.entries(notifs).map((vals) => {
                        const notifId = vals[0]
                        console.log(notifId);
                        const notif = vals[1]
                        return (<div key={notifId}><Notification type={notif.type} initiatorId={notif.initiatorId} /> <hr /></div>)
                    })}
                    {/* <button onClick={() => { addNotif("iuid", "uid3", "postId3", "like3", "march3") }}>ADD NOTIF</button> */}
                </div>
            </div>



        </div>
    )
}

export default Notifications