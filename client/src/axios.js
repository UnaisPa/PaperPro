import axios from "axios";
const port = 5000
export const baseUrl = `http://localhost:${port}/api`
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials:true 
});

export default instance;