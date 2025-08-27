import axios from "axios";

const auth = axios.create({
    baseURL: "http://localhost:8080/api",
});

auth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default auth;
