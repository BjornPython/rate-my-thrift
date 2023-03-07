import { useEffect } from "react"
import logo from "../../svgs/logo.svg"
import { useState } from "react"
import { loginWithEmailPass } from "../../auth/authWithEmailPass"
import google from "../../svgs/google.svg"
import facebook from "../../svgs/facebook.svg"
import { callGoogleSigninPopup } from '../../auth/authWithGoogle'

function Login() {
    const [showError, setShowError] = useState(false)
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { email, password } = loginData

    useEffect(() => {
        let timer;
        if (showError) {
            timer = setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showError]);

    const handleLoginChange = (e) => {
        e.preventDefault()
        setLoginData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleLogIn = async () => {
        try {
            await loginWithEmailPass(email, password)
        } catch (err) {
            // console.log("IN CLIENT", err.split(":")[2].split("/")[1]); 
            const error = err.message.split("/")[1]
            console.log("IN CLIENT", error.slice(0, error.length - 2));
            setShowError(`login Failed, ${error.slice(0, error.length - 2)}`)
        }
    }

    return (
        <div className="log-in-container" style={{ height: "395px" }}>
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='email' name="email" value={email} onChange={handleLoginChange} />
                <input type="text" placeholder='password' name="password" value={password} onChange={handleLoginChange} />
            </div>

            <button className='log-in-btn' onClick={handleLogIn} >Sign In</button>
            <div className="or"><hr /><h4>or</h4><hr /></div>
            <div className="sign-in-with">
                <div className="icon">
                    <img src={google} alt="" onClick={callGoogleSigninPopup} />
                </div>

            </div>
            {showError && <h4 className="auth-error-msg">{showError}</h4>}
        </div>
    )
}

export default Login