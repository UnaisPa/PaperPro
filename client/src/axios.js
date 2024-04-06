import axios from "axios";
const port = 5000
const baseUrl = `http://localhost:${port}/api`
const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;