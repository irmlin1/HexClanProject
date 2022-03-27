//Service file for handling about-page related HTTP requests

import AxiosInstance from "../httpClient"

export const updateAboutContent = async (content) => {
    try {
        console.log("siunciu: ", JSON.stringify(content))
        console.log(typeof JSON.stringify(content))
        console.log(content)

        return await AxiosInstance.post("/about", {
            content: JSON.stringify(content)
        });
    } catch (err) {
        console.error("About page content update failed: ", err);
        return err.response;
    }
};

export const getAboutContent = async () => {
    try {
        return await AxiosInstance.get("/about");
    } catch (err) {
        console.error("About page content retrieval was unsuccessful.", err);
        return err.response;
    }
};