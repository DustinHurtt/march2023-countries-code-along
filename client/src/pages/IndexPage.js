import Post = require("../../../server/models/Post")

const IndexPage = () => {



    return (
        <>
            {
                posts.length ? 
                <>
                    {
                        posts.map((post) => {
                            return <Post {...post} />
                        })
                    }
                </>
                : <p>Loading...</p>
            }
        </>
    )
}