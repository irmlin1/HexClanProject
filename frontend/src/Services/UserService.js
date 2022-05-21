//Service file for handling register related HTTP requests

import AxiosInstance from "../httpClient"

export const registerNewUser = async (user) => {
    try {
        return await AxiosInstance.post("/users/register", user);
    } catch (err) {
        console.error("Could not register new user ", err.response);
        return err.response;
    }
};

export const login = async (details) => {
    try {
        return await AxiosInstance.post("/users/login", details);
    } catch (err) {
        console.error("Could not login", err.response);
        return err.response;
    }
};

export const checkAuthStatus = async () => {
    try {
        return await AxiosInstance.get("/users/auth-status", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("Authentication status request failed", err);
        return err.response;
    }
};

export const getUser = async (email) => {
    try {
        return await AxiosInstance.get("/users/"+email, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        })
    } catch (err) {
        console.error("Get user status request failed", err);
      }
    }
export const getUsers = async () => {
    try {
        return await AxiosInstance.get("/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("Could not retrieve users", err.response);
        return err.response;
    }
};

export const getUserRoles = async (email) => {
    try {
        return await AxiosInstance.get("/users/role/" + email, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("Could not retrieve user roles", err.response);
        return err.response;
    }
};

export const updateUserRoles = async (email, newRoles) => {
    try {
        return await AxiosInstance.post("/users/role/edit/" + email, newRoles, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("Could not update user roles", err.response);
        return err.response;
    }
};
