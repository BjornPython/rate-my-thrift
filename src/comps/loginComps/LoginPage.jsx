import React from 'react'
import "../../css/login/loginPage.css"
import Login from './Login'
import Register from './Register'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function LoginPage({ user }) {
    const navigate = useNavigate()
    const [page, setPage] = useState("Sign up")

    const handleSignClick = () => {
        if (page === "Sign up") { setPage("Sign in") }
        else { setPage("Sign up") }
    }

    useEffect(() => {
        if (user) {
            console.log("NAVIGATING");
            navigate("/home")
        }
    }, [user])


    return (
        <div className='login-page'>
            <div className="login-contents">

                <div className="demo">
                    <h1>find </h1>
                    <h1 id='demo-focus'>INSPIRATION</h1>
                    <h1>for your next <br /> fashion</h1>
                    <hr />
                </div>

                <div className="log-in">
                    {page === "Sign up" && <Login />}
                    {page === "Sign in" && <Register />}

                    <div className="log-in-sign-up">
                        {page === "Sign up" ? <p>Dont have an account?</p> : <p>Already have an account?</p>}
                        <p onClick={handleSignClick}>{page}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage