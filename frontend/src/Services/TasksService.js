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

export const addTask = async (createdTask) => {
    try {
        return await AxiosInstance.post("/tasks", createdTask, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("Could not add new task", err.response);
        return err.response;
    }
};