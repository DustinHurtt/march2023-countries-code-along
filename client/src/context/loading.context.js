import { createContext, useState } from "react";

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <LoadingContext.Provider value={{ user, isLoading, setIsLoading, setUser}} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }