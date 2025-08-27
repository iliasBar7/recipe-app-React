import axios from "axios";

const registerPublicApi = axios.create({
    baseURL: "http://localhost:8080/api",
});

export default registerPublicApi;
