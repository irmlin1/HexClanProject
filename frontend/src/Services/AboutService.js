//Service file for handling about-page related HTTP requests

import AxiosInstance from "../httpClient"

export const updateAboutContent = async (content) => {
    try {
        return await AxiosInstance.post("/about", {
            content: JSON.stringify(content)
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("About page content update failed: ", err);
        return err.response;
    }
};

export const getAboutContent = async () => {
    try {
        return await AxiosInstance.get("/about", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("JWT_ACCESS_TOKEN_HEX_CLAN")}`
            }
        });
    } catch (err) {
        console.error("About page content retrieval was unsuccessful.", err);
        return err.response;
    }
};