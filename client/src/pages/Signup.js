import { useContext, useState } from "react"

import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../context/auth.context"
import { LoadingContext } from "../context/loading.context"

import { post } from "../services/authService"

const Signup = () => {

    const { setUser } = useContext(LoadingContext)

    const { storeToken } = useContext(AuthContext)

    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        fullName: "",
        location: "",
        age: 0
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((results) => {
                console.log("Signup", results.data)
                storeToken(results.data.authToken)
                setUser({...results.data.user, fullName: '', location: '', age: '' })
                navigate('/profile')
            })
            .catch((err) => {
                console.log("Error message=====>", err.data.message)
            })

    }

  return (


    <div id='auth-landing'>

        <h1>Signup</h1>
    
        <form onSubmit={handleSubmit}>

            <label>email</label>
            <input type="text" name="email" value={newUser.email} onChange={handleChange} />

            <label>password</label>
            <input type="password" name="password" value={newUser.password} onChange={handleChange} />


            <button type="submit">Signup</button>
        </form>
    </div>
  )
}



export default Signup
