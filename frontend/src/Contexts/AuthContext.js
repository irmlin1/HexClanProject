import {createContext, useContext, useEffect, useState} from "react";
import {checkAuthStatus} from "../Services/UserService";
import jwt from 'jwt-decode'

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const token = localStorage.getItem('JWT_ACCESS_TOKEN_HEX_CLAN')
    const userThis = token === null ? null : jwt(token);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        checkStatus();
    }, []);


    const checkStatus = async () => {
        const res = await checkAuthStatus();
        try {
            if (res && res.data.Success) {
                setIsAuthenticated(true);
                setUserDetails({
                    email: userThis.email,
                    userName: userThis.sub,
                    roles: userThis.roles
                })
            }
            else
                setIsAuthenticated(false);
        }
        catch {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, userDetails, setUserDetails }}
        >
            {children}
        </AuthContext.Provider>
    );
}
