import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"

function Notification({ type, initiatorId }) {

    const [initiatorInfo, setInitiatorInfo] = useState({ name: "", dpURL: null, dateTime: "" })

    const { name, dpURL, dateTime } = initiatorInfo

    useEffect(() => {
        const getInfo = async () => {
            const info = await getUserInfo(initiatorId)
            setInitiatorInfo(info)
        }
        getInfo()
    }, [])

    return (
        <div className='notif'>
            {dpURL
                ?
                <img src={dpURL} className="comment-dp notif-img" />

                :
                <FontAwesomeIcon icon={faCircle} className="comment-dp notif-img" />}

            <div className="notif-content">
                <h4>{name} {type} your Post</h4>
                <p>feb 20, 2022</p>
            </div>

        </div>
    )
}

export default Notification