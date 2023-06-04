import { createContext, useState, useMemo, useCallback } from "react";
import { get } from "../services/authService";
import axios from 'axios'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [countries, setCountries ] = useState([]);
    const [country, setCountry] = useState(null)
    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState(null)
    const [singlePost, setSinglePost] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [mapPosition, setMapPosition] = useState(null)

    const setTimedMessage = (newMessage) => {
        setErrorMessage(newMessage);
        setTimeout(() => {
          setErrorMessage('')
        }, 4000)
      }

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

    const getSinglePost = async (thesePosts, id) => {

        if (!thesePosts.length) {

            try {
                let results = await get(`/posts/detail/${id}`)
                setSinglePost(results.data)
            }

            catch(err) {
                console.log(err)
            }

        } else {

            let thisPost = thesePosts.find((element) => element._id === id)
            setSinglePost(thisPost)

        }
    }
    // const getSinglePost = async (thesePosts, id) => {

    //     if (!thesePosts.length) {
    //         // getPosts()
    //         try {
    //             let results = await get(`/posts/detail/${id}`)
    //             setSinglePost(results.data)
    //             // let position = [results.data.country.coordinates[0], results.data.country.coordinates[1]];
    //             // setMapPosition(position);

    //         }

    //         catch(err) {
    //             console.log(err)
    //         }
    //         // get(`/posts/detail/${id}`)
    //         // .then((results) => {
    //         //     console.log("single post", results.data)
    //         //     setSinglePost(results.data)
    //         // })
    //         // .catch((err) => {
    //         //     console.log(err)
    //         // })
    //     } else {

    //         let thisPost = thesePosts.find((element) => element._id === id)
    //         setSinglePost(thisPost)
    //         // let position = [thisPost.country.coordinates[0], thisPost.country.coordinates[1]];
    //         // setMapPosition(position);
    //     }
    // }

    return (
        <LoadingContext.Provider value={{ countries, user, isLoading, setIsLoading, setUser, getCountries, findCountry, country, getUserPosts, userPosts, setUserPosts, posts, setPosts, getPosts, singlePost, setSinglePost, getSinglePost, errorMessage, setTimedMessage, mapPosition }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }