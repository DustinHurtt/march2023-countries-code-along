
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails'

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/countries' element={<Countries />} />
        <Route path='/countries/:id' element={<CountryDetails />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:id' element={<PostDetails />} />


      </Routes>

    </div>
  );
}

export default App;
