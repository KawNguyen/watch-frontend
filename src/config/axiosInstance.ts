import axios from "axios";

const BE_URL = import.meta.env.VITE_BACKEND_URL;
// const BE_URL = "http://localhost:3000/v1/api";


const axiosInstance = axios.create({
  baseURL: BE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
