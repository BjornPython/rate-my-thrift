import logo from "../../svgs/logo.svg"
import { registerWithEmailPass } from "../../auth/authWithEmailPass"
import { useState } from "react"
import google from "../../svgs/google.svg"
import facebook from "../../svgs/facebook.svg"
import { callGoogleSigninPopup } from '../../auth/authWithGoogle'

function Register() {
    const [registerData, setRegisterData] = useState({ email: "", password: "", cpassword: "" })
    const { email, password, cpassword } = registerData

    const handleRegisterChange = (e) => {
        setRegisterData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleSignUp = () => {
        if (password !== cpassword) { console.log("PASSWORDS DO NOT MATCH..."); return }
        registerWithEmailPass(email, password)
    }

    return (
        <div className="log-in-container" style={{ height: "480px" }}>
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='email' name="email" value={email} onChange={handleRegisterChange} />
                <input type="text" placeholder='password' name="password" value={password} onChange={handleRegisterChange} />
                <input type="text" placeholder='confirm password' name="cpassword" value={cpassword} onChange={handleRegisterChange} />
            </div>

            <button className='log-in-btn' onClick={handleSignUp}>Sign up</button>
            <div className="or"><hr /><h4>or</h4><hr /></div>
            <div className="sign-in-with">
                <div className="icon">
                    <img src={google} alt="" onClick={callGoogleSigninPopup} />
                </div>

            </div>
        </div>
    )
}

export default Register