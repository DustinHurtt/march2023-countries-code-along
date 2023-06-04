import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { LoadingContext } from "../context/loading.context"

import { get, post } from "../services/authService"

import { fileChange } from '../services/fileChange'

const EditPost = () => {

    const { posts, userPosts, setPosts, setUserPosts, singlePost, setSinglePost, getSinglePost, setTimedMessage } = useContext(LoadingContext)

    const { id } = useParams()

    const navigate = useNavigate()

    const [updatedPost, setUpdatedPost] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleTextChange = (e) => {
        setUpdatedPost((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log(updatedPost)
    }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
          .then((response) => {
            console.log(response.data);
            setUpdatedPost((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post(`/posts/update/${singlePost._id}`, updatedPost)
            .then((results) => {
                setSinglePost(results.data)
                navigate(`/posts/${results.data._id}`)          
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("submitting")
    }

    const deletePost = () => {
        get(`/posts/delete/${id}`)
            .then((results) => {
                console.log("Deleted result:", results.data)
                if (posts.length) {

                    let newPosts = posts.filter((post) => post._id !== id)
                    setPosts(newPosts)     
                }
                if (userPosts.length) {
                    let newUserPosts = userPosts.filter((post) => post._id !== id) 
                    setUserPosts(newUserPosts)
                }
                setTimedMessage("Post has been deleted")
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                navigate('/profile')
            })
        console.log("deleting")
    }


    useEffect(() => {
        if (!singlePost) {
            getSinglePost(posts, id)
            console.log("use effecting")
        }

    }, [])

    useEffect(() => {
        if (singlePost) {
            setUpdatedPost(singlePost)
        }
    }, [singlePost])



  return (

    <div>

    <h1>Edit Post</h1>

    {updatedPost ?
    <div>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input name='title' type='text' value={updatedPost.title} onChange={handleTextChange} />

            <label>Story</label>
            <textarea name='story' value={updatedPost.story} onChange={handleTextChange} />

            <label>Image</label>
            <input name='image' type="file" onChange={handleFileChange}/>

            <button type='submit' disabled={buttonDisabled}>Update Post</button>
        </form>

        <button onClick={deletePost}>Delete Post</button>

    </div>

    : <p>Loading...</p>
    
    }
    </div>


  )
}

export default EditPost

// title
// story
// image