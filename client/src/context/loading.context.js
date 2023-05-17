import { createContext } from "react";

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {



    return (
        <LoadingContext.Provider value={{}} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }