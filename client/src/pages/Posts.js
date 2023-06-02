import { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { LoadingContext } from "../context/loading.context"

import { returnRelativeTime } from "../services/time"

const Posts = () => {

    const { user, posts, getPosts, setSinglePost, getSinglePost, setTimedMessage } = useContext(LoadingContext)

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

    useEffect(() => {
        if(!posts.length) {
            getPosts()
        }
    }, [])


  return (
    <div id="all-posts">
    <h1>Posts</h1>

    {posts.length ? 

        <div id="all-posts-container">

            {
               posts.map((post) => {

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