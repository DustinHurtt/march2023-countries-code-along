import { useEffect, createContext, useContext } from "react";

import { LoadingContext } from "./loading.context";

import { get } from '../services/authService'


const AuthContext = createContext();

function AuthProvider({ children }) {

  const { setIsLoading, setUser } = useContext(LoadingContext)

  const storeToken = (token) => {       
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {                   

    localStorage.removeItem("authToken");
  }

  const authenticateUser = () => {          
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      get('/auth/verify')    
      .then((response) => {
        console.log("user", response.data)
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        

        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         

        setIsLoading(false);
        setUser(null);
        removeToken();    
      });      
    } else {
      // If the token is not available (or is removed)

        setIsLoading(false);
        setUser(null);      
    }   
  }

  
  const logOutUser = () => {                  
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  
  
  useEffect(() => {                                    
    authenticateUser();                  
   }, []);
  


  return (
    <AuthContext.Provider value={{ storeToken, authenticateUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };
