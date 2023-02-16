import logo from "../../svgs/logo.svg"

function Register() {
    return (
        <div className="log-in-container" style={{ height: "400px" }}>
            <img src={logo} alt="" className='log-in-logo' />

            <div className="log-in-inputs">
                <input type="text" placeholder='name' />
                <input type="text" placeholder='email...' />
                <input type="text" placeholder='password...' />
                <input type="text" placeholder='confirm password...' />
            </div>

            <button className='log-in-btn'>Sign up</button>

        </div>
    )
}

export default Register