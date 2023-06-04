
import './App.css';

import { useContext } from 'react'

import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import { LoadingContext } from './context/loading.context';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';
import ProfileUpdate from './pages/ProfileUpdate';
import EditPost from './pages/EditPost'


function App() {
  
  const { setTimedMessage } = useContext(LoadingContext)

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    // setTimedMessage('Please login to access that feature.')
    return getToken() ? <Outlet /> : <Navigate to='/login' /> 
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }



  return (
    <div className="App">

    
       <Navbar />

       <Routes>

         <Route path='/' element={<Home />} />
         <Route path='/countries' element={<Countries />} />
         <Route path='/country/:id' element={<CountryDetails />} />
         <Route path='/posts' element={<Posts />} />
        

         <Route element={<NotLoggedIn />}>

           <Route path='/signup' element={<Signup />} />
           <Route path='/login' element={<Login />} />

         </Route>


         <Route element={<LoggedIn />}>

           <Route path='/profile' element={<Profile />} />
           <Route path='/profile/:id' element={<ProfileUpdate />} />
           <Route path='/add-post' element={<AddPost />} />
           <Route path='/posts/:id' element={<PostDetails />} />
           <Route path='/edit-post/:id' element={<EditPost />} />

         </Route>

       </Routes>



    </div>
  );
}

export default App;







