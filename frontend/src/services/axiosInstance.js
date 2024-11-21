import axios from "axios";
import authService from "./authService";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Inject token
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
    }
);

// Response Interceptor: Handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            authService.logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
