import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import CreatableSelect from 'react-select/creatable'

import _ from 'lodash'

import { LoadingContext } from "../context/loading.context"

import { returnRelativeTime } from "../services/time"

const Posts = () => {

    const { user, posts, getPosts, setSinglePost, getSinglePost, setTimedMessage } = useContext(LoadingContext)

    const [filterTerm, setFilterTerm] = useState('')

    const setPost = (id) => {
        let thisPost = posts.find((element) => element._id === id)
        setSinglePost(thisPost)
    }

    const handleClick = (id) => {
        if (!user) {
            setTimedMessage('Please login to access that feature.')
        }
        getSinglePost(posts, id)
    }

    const sort = (array) => {
        return array.sort((a, b) => a.country.commonName.localeCompare(b.country.commonName))
    }

    const visited = posts ? [...sort(posts)].map((country) => {
        
        return { 
            label: country.country.commonName,
            value: country.country.commonName   
        }

    }) : []

    // .filter((value, index, array) => array.indexOf(value) === index)

    console.log("Vistited", [...new Map(visited.map((country) => [country['value'], country])).values()])
    console.log("Vistited 2", _.uniqWith(visited, _.isEqual))
    

    const theseOptions = posts ? _.uniqWith(visited, _.isEqual) : []

    const handleSelectChange = (e) => {

        console.log("Select change")

        if (!e) {
            setFilterTerm('')
        } else {
            setFilterTerm(e.value)
            }

        }


    const filtered = filterTerm ? posts.filter((post) => post.country.commonName === filterTerm) : posts


    useEffect(() => {
        if(!posts.length) {
            getPosts()
        }
    }, [])


  return (
    <div id="all-posts">
    <h1>Posts</h1>

    <h3>Filter posts by country:</h3>

    <CreatableSelect id="selector" isClearable options={theseOptions} onChange={handleSelectChange}/>

    {posts.length ? 

        <div id="all-posts-container">

            {
               filtered.map((post) => {

                return (
                    <Link to={`/posts/${post._id}`} id="all-posts-link" key={post._id} onClick={()=>handleClick(post._id)} >
                        
                            <img src={post.image} alt="post"/>
                            <div>
                                <h4 key={post._id}>{post.title}</h4>
                                <h5>Story about {post.country.commonName}</h5>
                                <p>Contributed by: {post.author.fullName}</p>
                                <p>Posted: {returnRelativeTime(post.createdAt)}</p>
                            </div>
                        
                    
                    </Link>
                ) 
        
    })
            }
            

        </div>
        

        : <p>Loading...</p>
    }

  
    </div>
  )
}

export default Posts

// title: String,
// story: String,
// image: String,
// country: {type: Schema.Types.ObjectId, ref: "Country"},
// author: {type: Schema.Types.ObjectId, ref: "User"},
// comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
// likes: [{type: Schema.Types.ObjectId, ref: "User"}]