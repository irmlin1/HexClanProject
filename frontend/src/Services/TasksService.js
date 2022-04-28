import AxiosInstance from "../httpClient"

export const getTasks = async () => {
    try {
        return await AxiosInstance.get("/tasks");
    }
    catch (err){
        console.error("Could not get Tasks: ", err);
        return err.response;
    }
}