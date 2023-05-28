import { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { LoadingContext } from "../context/loading.context"



const Posts = () => {

    const { posts, getPosts } = useContext(LoadingContext)

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
                    <Link id="all-posts-link" key={post._id} >
                        
                            <img src={post.image} alt="post"/>
                            <div>
                                <h4 key={post._id}>{post.title}</h4>
                                <h5>Story about {post.country.commonName}</h5>
                                <p>Contributed by: {post.author.fullName}</p>
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