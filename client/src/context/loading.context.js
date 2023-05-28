import { createContext, useState } from "react";
import { get } from "../services/authService";
import axios from 'axios'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [countries, setCountries ] = useState([]);
    const [country, setCountry] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [singlePost, setSinglePost] = useState(null)

    const getCountries = () => {

        axios.get("https://ih-countries-api.herokuapp.com/countries")
            .then((results) => {
                setCountries(results.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const findCountry = (id) => {
            console.log("finding")
            let thisCountry = countries.find((country) => country._id === id)
            console.log("this country", thisCountry)
            setCountry(thisCountry) 
    }

    const getPosts = () => {
        
        get('/posts')
            .then((results) => {
                console.log("retrieved posts", results.data)
                setPosts(results.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getUserPosts = (id) => {
        get(`/posts/user-posts/${id}`)
            .then((results) => {
                console.log("user posts:", results.data)
                setUserPosts(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getSinglePost = (id) => {

        if (!posts.length) {
            get(`/posts/detail/${id}`)
            .then((results) => {
                setSinglePost(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {

            let thisPost = posts.find((element) => element._id === id)
            setSinglePost(thisPost)
        }
    }

    return (
        <LoadingContext.Provider value={{ countries, user, isLoading, setIsLoading, setUser, getCountries, findCountry, country, getUserPosts, userPosts, setUserPosts, buttonDisabled, setButtonDisabled, posts, setPosts, getPosts, singlePost, setSinglePost, getSinglePost }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }