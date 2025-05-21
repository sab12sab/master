import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_APP_API_KEY}`
  }
});

export default axiosInstance;
