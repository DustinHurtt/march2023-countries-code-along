import { useState, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { LoadingContext } from '../context/loading.context'

import { AuthContext } from '../context/auth.context'

import { post } from '../services/authService'

import { fileChange } from '../services/fileChange'


const ProfileUpdate = () => {

    const { user, setUser } = useContext(LoadingContext)

    const { storeToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const [updatedUser, setUpdatedUser] = useState(user)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    // const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleTextChange = (e) => {
        setUpdatedUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleNumberChange = (e) => {
        setUpdatedUser((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
          .then((response) => {
            console.log(response.data);
            setUpdatedUser((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });

    }


    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/users/update/${user._id}`, updatedUser)
            .then((results) => {
                console.log("Results", results.data)
                storeToken(results.data.authToken)
                setUser(results.data.user)
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err)
            })

    }

    

    useEffect(() => {
        // if (user) {
            setUpdatedUser(user)
        // }
    }, [])    


  return (
    <div className="form">
        <h1>Profile Update</h1>

        {
            updatedUser ? 

        <form onSubmit={handleSubmit} >

            <label htmlFor="fullName" >Full Name</label>
            <input id="fullName" name='fullName' type="text" value={updatedUser.fullName} onChange={handleTextChange} />

            <label htmlFor="location" >Location</label>
            <input id="location" name="location" type="text" value={updatedUser.location} onChange={handleTextChange} />

            <label htmlFor="age" >Age</label>
            <input id="age" name="age" type="number" value={updatedUser.age} onChange={handleNumberChange} />

            <label htmlFor="profilePic" >Profile Picture</label>
            <input id="profilePic" name='profilePic' type="file" onChange={handleFileChange} />

            <button type='submit' disabled={buttonDisabled}>Update Profile</button>

        </form>

        : <p>Loading...</p>

        }

    </div>
  )
}

export default ProfileUpdate

