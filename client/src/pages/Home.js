import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div id='home'>
        <h1>Welcome!</h1>
        
        <Link to={'/countries'}>
        <h1>Countries</h1></Link>

        <Link to={'/posts'}><h1>Posts</h1></Link>

    </div>
  )
}

export default Home