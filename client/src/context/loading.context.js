import { createContext, useState } from "react";
import axios from 'axios'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [countries, setCountries ] = useState([])

    const getCountries = () => {
        
        axios.get("https://ih-countries-api.herokuapp.com/countries")
            .then((results) => {
                setCountries(results.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <LoadingContext.Provider value={{ countries, user, isLoading, setIsLoading, setUser, getCountries }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }