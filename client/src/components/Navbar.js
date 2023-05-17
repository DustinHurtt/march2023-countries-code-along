import { Link } from "react-router-dom"

import { useContext } from 'react'

import { AuthContext } from "../context/auth.context"

const Navbar = () => {

    const { logOutUser } = useContext(AuthContext)

    const getToken = () => {
        return localStorage.getItem('authToken')
      }

  return (

    <nav>

        <Link to='/'>Home</Link>

        <Link to='/countries'>Countries</Link>

        <Link to='/posts'>Posts</Link>


        {
            getToken() ?

            <>

                <Link to='/profile'>Profile</Link>

                <Link to='/add-post'>Add Post</Link>

                <button onClick={logOutUser}>Logout</button>

            </>

            :

            <>

                <Link to='/signup'>Sign Up</Link>

                <Link to='login'>Login</Link>

            </>
        }




    </nav>

  )
}

export default Navbar