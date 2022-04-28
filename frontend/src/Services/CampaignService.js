import AxiosInstance from "../httpClient"

export const createNewCampaign = async (campaign) => {
    try {
        return await AxiosInstance.post("/campaign", campaign);
    } catch (err) {
        console.error("Could not create campaign: ", err.response);
        return err.response;
    }
};

export const getCampaigns = async () => {
    try {
        return await AxiosInstance.get("/campaign");
    }
    catch (err){
        console.error("Could not create campaign: ", err.response);
        return err.response;
    }
}