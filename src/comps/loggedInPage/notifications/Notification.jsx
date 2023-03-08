import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getUserInfo } from "../../../apis/firestoreUsersFuncs"

function Notification({ type, initiatorId }) {

    const [initiatorInfo, setInitiatorInfo] = useState({ name: "", dpURL: null })

    const { name, dpURL } = initiatorInfo

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
                <img src={dpURL} className="comment-dp" />

                :
                <FontAwesomeIcon icon={faCircle} className="comment-dp" />}
            <h4>{name} {type} your Post</h4>
        </div>
    )
}

export default Notification