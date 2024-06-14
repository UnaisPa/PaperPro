import axios from "axios";
const port = 5000
export const baseUrl = `https://paperpro.site/api`
// export const baseUrl = `http://localhost:5000/api`

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials:true 
});

export default instance;