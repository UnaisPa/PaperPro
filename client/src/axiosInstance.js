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

export default axios