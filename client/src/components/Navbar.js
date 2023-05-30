import { Link } from "react-router-dom"

import { useContext } from 'react'

import { AuthContext } from "../context/auth.context"

const Navbar = () => {

    const { logOutUser } = useContext(AuthContext)

    const getToken = () => {
        return localStorage.getItem('authToken')
      }

  return (

    <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-purple-500 mb-3'>

        <Link to='/' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Home</Link>

        <Link to='/countries' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Countries</Link>

        <Link to='/posts' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Posts</Link>


        {
            getToken() ?

            <>

                <Link to='/profile' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Profile</Link>

                <Link to='/add-post' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Add Post</Link>

                <button onClick={logOutUser} className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Logout</button>

            </>

            :

            <>

                <Link to='/signup' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Sign Up</Link>

                <Link to='login' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Login</Link>

            </>
        }

        


    </nav>

  )
}

export default Navbar