import { useContext } from 'react'

import { LoadingContext } from '../context/loading.context'


const Profile = () => {

    const { user } = useContext(LoadingContext)
    
  return (
    <div>
        <h1>Profile</h1>


        {user && 
        
        <img src={user.profilePic}  alt='profile'/>
        
        }

    
    
    </div>
  )
}

export default Profile