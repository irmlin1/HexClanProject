import { createContext, useEffect, useState } from "react";
import {checkAuthStatus} from "../Services/UserService";
import jwt from 'jwt-decode'

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const token = localStorage.getItem('JWT_ACCESS_TOKEN_HEX_CLAN')
    const userThis = jwt(token);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: userThis.sub,
        userName: userThis.email
    })

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        const res = await checkAuthStatus();
        if (res && res.data.Success)
            setIsAuthenticated(true);
        else
            setIsAuthenticated(false);
        console.log(userDetails.userName, userDetails.email);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, userDetails, setUserDetails }}
        >
            {children}
        </AuthContext.Provider>
    );
}
