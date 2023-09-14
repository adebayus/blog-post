import axios from "axios";

const Axios = axios.create();

Axios.interceptors.request.use(
    (config) => {
        console.log(config, "request")
        // Modify the request config if needed (e.g., add an authentication token)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        // Modify the response data if needed
        return response;
    },
    (error) => {
        // Handle response errors (e.g., show a notification)
        return Promise.reject(error);
    }
);

export default Axios;