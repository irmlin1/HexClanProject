//Service file for handling register related HTTP requests

import AxiosInstance from "../httpClient"

export const registerNewUser = async (user) => {
    try {
        console.log(user)
        return await AxiosInstance.post("/users/register", user);
    } catch (err) {
        console.error("Could not register new user ", err.response);
        return err.response;
    }
};