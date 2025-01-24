import axios from "axios";
const baseURL = "http://localhost:8080/";

const apiClient = axios.create({
  baseURL: baseURL,
});
apiClient.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

module.exports = { apiClient };
