import { createContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../Services/UserService";
// import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [_cookies, removeCookie] = useCookies();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        const res = await checkAuthStatus();
        if (res && res.data.Success)
            setIsAuthenticated(true);
        else
            setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}
