import React from 'react'
import "../../css/loginPage.css"
import Login from './Login'
import Register from './Register'
import { useState } from 'react'

function LoginPage() {

    const [page, setPage] = useState("Sign up")

    const handleSignClick = () => {
        if (page === "Sign up") { setPage("Sign in") }
        else { setPage("Sign up") }
    }

    return (
        <div className='login-page'>
            <div className="login-contents">

                <div className="demo">
                    <h1>demo</h1>
                </div>

                <div className="log-in">
                    {page === "Sign up" && <Login />}
                    {page === "Sign in" && <Register />}

                    <div className="log-in-sign-up">
                        <p>Dont have an account?</p>
                        <p onClick={handleSignClick}>{page}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage