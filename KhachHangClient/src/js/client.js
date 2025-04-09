import axios from "axios";
const baseURL = "http://localhost:3000/";

export const apiClient = axios.create({
  baseURL: baseURL,
});
apiClient.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);
