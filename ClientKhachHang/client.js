import axios from "axios";
const baseURL = "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: baseURL,
});
apiClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    return conf;
  },
  (error) => Promise.reject(error)
);
