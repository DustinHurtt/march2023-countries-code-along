import { useContext, useState } from "react"

import { useNavigate } from 'react-router-dom'

import CreatableSelect from 'react-select/creatable'

import { LoadingContext } from "../context/loading.context"

import { fileChange } from "../services/fileChange";

import { post } from "../services/authService";

const AddPost = () => {

    const { user, posts, setPosts, getPosts } = useContext(LoadingContext)

    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        title: '',
        story: '',
        image: '',
        country: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleTextChange = (e) => {
        setNewPost((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log("Post changing", newPost)
    }

    const sort = (array) => {
        return array.sort((a, b) => a.commonName.localeCompare(b.commonName))
    }

    const visited = user ? [...sort(user.visitedCountries), {_id: "", commonName: "Add new country"}].map((country) => {
        return { 
            key: country._id,
            label: country.commonName,
            value: country.commonName   
        }
    }) : []

    const theseOptions = user ? visited : []

    const handleSelectChange = (e) => {

        console.log("Select change")

        if (!e) {
            setNewPost((prev) => ({        
                title: '',
                story: '',
                image: '',
                country: ''
            }))
        } else {
            if (e.value === 'Add new country') {
                navigate('/countries')
            } else {
                setNewPost({        
                    title: '',
                    story: '',
                    image: '',
                    country: e.key
                })
            }
        }
    
    }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
          .then((response) => {
            console.log(response.data);
            console.log("post", newPost)
            setNewPost((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/posts/create', newPost)
            .then((results) => {
                console.log("post create result", results.data)
                if (posts.length) {
                    setPosts([results.data, ...posts])
                } else {
                    getPosts()
                }
                         
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                navigate('/posts')
            })

    }

    

  return (
    <div>
        <h1>Add Post</h1>

        {user ?


            <>

            <div className="form">


                {
                    user.visitedCountries.length ? 
                    <>
                         <CreatableSelect id="selector" isClearable options={theseOptions} onChange={handleSelectChange}/>
                    </>
                    : <p>No visited countries added</p>
                }

                {console.log("this is new post now", newPost)}
                { newPost.country ? 

                
                <form onSubmit={handleSubmit}>
                    <label>Image</label>
                    <input type="file" name='image' onChange={handleFileChange} />

                    <label>Title</label>
                    <input type="text" name='title' value={newPost.title} onChange={handleTextChange} />
                    <label>Story</label>
                    <textarea name='story' value={newPost.story} onChange={handleTextChange} />

                    <button type='submit' disabled={buttonDisabled}>Submit Post</button>


                </form>

                : <p>Choose country...</p>
                }


            </div>
            </>

            :

            <p>You must be logged in to add a post.</p>

        }
    </div>
  )
}

export default AddPost

// title: String,
// story: String,
// image: String,

// author: {type: Schema.Types.ObjectId, ref: "User"},
