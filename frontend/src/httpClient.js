import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        "http://localhost:40924/api",
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
});

/**
 * Catch the Unauthorized Request
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // check if we are already in login page
            // to avoid loop of page refreshes
            if (window.location.pathname !== "/login") window.location = "/login";
        }
    }
);

export default axiosInstance;
