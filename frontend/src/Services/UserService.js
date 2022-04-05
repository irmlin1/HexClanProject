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
    console.log(details)
    try {
        return await AxiosInstance.post("/users/login", details);
    } catch (err) {
        console.error("Could not login", err.response);
        return err.response;
    }
};