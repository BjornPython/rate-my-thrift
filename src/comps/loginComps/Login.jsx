import { useEffect } from "react"
import logo from "../../svgs/logo.svg"
import { useState } from "react"
import { loginWithEmailPass } from "../../auth/firebase"

function Login() {

    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { email, password } = loginData

    const handleLoginChange = (e) => {
        e.preventDefault()
        setLoginData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className="log-in-container">
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='username/email' name="email" value={email} onChange={handleLoginChange} />
                <input type="text" placeholder='password...' name="password" value={password} onChange={handleLoginChange} />
            </div>

            <button className='log-in-btn' onClick={() => { loginWithEmailPass(email, password) }} >Sign In</button>
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}

export default Login