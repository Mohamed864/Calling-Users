import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true, // ⬅️ VERY IMPORTANT
});

//interceptors for request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    console.log(
        "Calling:",
        `${import.meta.env.VITE_API_BASE_URL}/api/register`
    );
    console.log(config.headers.Authorization);
    return config;
});

export default axiosClient;

//interceptors for response to take action
axiosClient.interceptors.response.use(
    (response) => {
        const { data } = response;
        console.log(data);
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }
        throw error;
    }
);
