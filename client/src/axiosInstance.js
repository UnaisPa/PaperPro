import { toast } from "react-toastify";
import axios from "./axios.js"

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use((response) => {
    return response;

}, async (error) => {
    if (error.response) {
        const user = localStorage.getItem('root');
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
            case 400:
                console.error('Bad Request:', error.response.data.message);
                break;
            case 401:
                console.error('Unauthorized:', error.response.data.message);
                const originalRequest = error.config;
                console.log('refresh token setting started')
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    console.log('refresh token setting correct')
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (!refreshToken) {
                            return Promise.reject(error);
                        }

                        // Request new access token using refresh token
                        const response = await axios.post('/users/refresh_token', { token: refreshToken,user:user._id });
                        const newAccessToken = response.data.token;

                        // Update local storage and set new access token
                        localStorage.setItem('jwt', newAccessToken);

                        // Set the new access token in the headers
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                        // Retry the original request with the new access token
                        return axios(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
                break;
            case 403:
                console.error('Forbidden:', error.response.data.message);
                break;
            case 404:
                console.error('Not Found:', error.response.data.message);
                break;
            case 500:
                console.error('Internal Server Error:', error.response.data.message);
                break;
            default:
                console.error('An error occurred:', error.response.data.message);
        }
    } else if (error.request) {
        // Network Error The request was made but no response was received
        console.error('Network Error : No response received:', error.message);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
})

export default axios