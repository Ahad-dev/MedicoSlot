import React, { createContext, useContext, useState, useEffect } from "react";
import { getBasicInfo } from "@/data/patient/patient";
const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // For loading state during token verification

    useEffect(() => {
        console.log("Checking token...");
        const verifyToken = async () => {
                try {
                    const {user} = await getBasicInfo();
                    console.log("Token verified", user);
                    setUser(user); 
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token verification failed", error.message);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            setLoading(false);
        };

        verifyToken();
    }, []);


    return (
        <AuthenticationContext.Provider
            value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
            {!loading ? children : <p>Loading...</p>} {/* Show loading state */}
        </AuthenticationContext.Provider>
    );
};

// Custom hook for accessing the authentication context
const useAuthentication = () => {
    return useContext(AuthenticationContext);
};

export { AuthenticationContext, AuthenticationContextProvider, useAuthentication };
