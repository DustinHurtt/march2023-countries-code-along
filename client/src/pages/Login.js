import { useContext, useState } from "react"

import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../context/auth.context"
import { LoadingContext } from "../context/loading.context"

import { post } from "../services/authService"

const Login = () => {

    const { setUser, errorMessage } = useContext(LoadingContext)

    const { storeToken } = useContext(AuthContext)

    const [thisUser, setThisUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setThisUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/login', thisUser)
            .then((results) => {
                console.log("Login", results.data)
                storeToken(results.data.authToken)
                setUser(results.data.user)
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err)
            })

    }

  return (


    <div id="auth-landing">

        <h1>Login</h1>
    
        <form onSubmit={handleSubmit}>

            <label>email</label>
            <input type="text" name="email" value={thisUser.email} onChange={handleChange} />

            <label>password</label>
            <input type="password" name="password" value={thisUser.password} onChange={handleChange} />


            <button type="submit">Login</button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default Login