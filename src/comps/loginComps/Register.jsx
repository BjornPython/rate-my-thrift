import logo from "../../svgs/logo.svg"
import { registerWithEmailPass } from "../../auth/authWithEmailPass"
import { useState, useEffect } from "react"
import google from "../../svgs/google.svg"
import facebook from "../../svgs/facebook.svg"
import { callGoogleSigninPopup } from '../../auth/authWithGoogle'

function Register() {
    const [showError, setShowError] = useState(false)

    const [registerData, setRegisterData] = useState({ email: "", password: "", cpassword: "" })
    const { email, password, cpassword } = registerData

    useEffect(() => {
        let timer;
        if (showError) {
            timer = setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showError]);

    const handleRegisterChange = (e) => {
        setRegisterData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleSignUp = async () => {
        if (!email) { setShowError("Please fill email field!"); return }
        if (password !== cpassword) { setShowError("Passwords do not match!"); return }
        try {
            await registerWithEmailPass(email, password)

        } catch (err) {
            console.log(err.message);
            const error = err.message.split("/")[1]
            setShowError(`Register Failed, ${error.slice(0, error.length - 2)}`)

        }
    }

    return (
        <div className="log-in-container" style={{ height: "440px" }}>
            <div className="logo-div">
                <h1 id='less-logo' >rate my</h1>
                <h1 id='log-in-logo' >THRIFTS</h1>
            </div>


            <div className="log-in-inputs">
                <input type="text" placeholder='email' name="email" value={email} onChange={handleRegisterChange} />
                <input type="password" placeholder='password' name="password" value={password} onChange={handleRegisterChange} />
                <input type="password" placeholder='confirm password' name="cpassword" value={cpassword} onChange={handleRegisterChange} />
            </div>

            <button className='log-in-btn' onClick={handleSignUp}>Sign up</button>
            <div className="or"><hr /><h4>or</h4><hr /></div>
            <div className="sign-in-with">
                <div className="icon">
                    <img src={google} alt="" onClick={callGoogleSigninPopup} />
                </div>

            </div>
            {showError && <h4 className="auth-error-msg-reg">{showError}</h4>}

        </div>
    )
}

export default Register