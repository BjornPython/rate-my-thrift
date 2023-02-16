import React from 'react'
import logo from "../../svgs/logo.svg"
function Login() {
    return (
        <div className="log-in-container">
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='username/email' />
                <input type="text" placeholder='password...' />
            </div>

            <button className='log-in-btn'>Sign In</button>

        </div>
    )
}

export default Login