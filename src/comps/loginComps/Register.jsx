import logo from "../../svgs/logo.svg"
import { register } from "../../auth/authWithEmailPass"
import { useState } from "react"
import google from "../../svgs/google.svg"
import facebook from "../../svgs/facebook.svg"

function Register() {
    const [registerData, setRegisterData] = useState({ email: "", password: "" })
    const { email, password } = registerData

    const handleRegisterChange = (e) => {
        setRegisterData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleSignUp = () => {
        register(email, password)
    }

    return (
        <div className="log-in-container" style={{ height: "470px" }}>
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='name' name="name" />
                <input type="text" placeholder='email' name="email" value={email} onChange={handleRegisterChange} />
                <input type="text" placeholder='password' name="password" value={password} onChange={handleRegisterChange} />
                <input type="text" placeholder='confirm password' />
            </div>

            <button className='log-in-btn' onClick={handleSignUp}>Sign up</button>
            <div className="or"><hr /><h4>or</h4><hr /></div>
            <div className="sign-in-with">
                <img src={google} alt="" />
                <img id="fb-icn" src={facebook} alt="" />
            </div>
        </div>
    )
}

export default Register