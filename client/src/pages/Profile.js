import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { LoadingContext } from '../context/loading.context'


const Profile = () => {

    const { user } = useContext(LoadingContext)
    
  return (
    <div>
        <h1>Profile</h1>

        {user && 
        
        <div>


            <img src={user.profilePic}  alt='profile'/>

            <br />

            <Link to={`/profile/${user._id}`}><button>Update Profile</button></Link>

        </div>

        }

    
    </div>
  )
}

export default Profile