import Notification from "./Notification"
import { addNotif } from "../../../apis/firestoreDataQueryFuncs"
import { notifCollection } from "../../../apis/firebase"
import { onSnapshot } from "firebase/firestore"
import { listenNewNotifs } from "../../../apis/firestoreDataQueryFuncs"
import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"

function Notifications({ uid }) {

    const r = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [notifs, setNotifs] = useState([])


    useEffect(() => {
        if (!uid) { return }
        const listenNotifs = async () => {
            const notifRef = doc(notifCollection, uid);
            const notifDoc = await getDoc(notifRef)
            if (notifDoc.exists()) {
                const unsub = onSnapshot(doc(notifCollection, uid), (doc) => { setNotifs(doc.data()) })
            }
        }
        listenNotifs()
    }, [])


    useEffect(() => {
        console.log("NEW NOTIFS: ", notifs);
    }, [notifs])


    return (
        <div className="notification-page">
            <div className="notification-contents">
                <h3>NOTIFICATIONS</h3>
                <div className="notifications">
                    <hr />
                    {/* {r.map((r) => {
                        return (<><Notification /> <hr /></>)
                    })} */}
                    <button onClick={() => { addNotif("iuid", "uid3", "postId3", "like3", "march3") }}>ADD NOTIF</button>
                </div>
            </div>



        </div>
    )
}

export default Notifications