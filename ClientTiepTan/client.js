import axios from "axios";
const baseURL = "http://localhost:3000"; // UserService

export const apiClient = axios.create({
  baseURL: baseURL,
});
apiClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    conf.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYVNvIjoiTlZfMSIsImlhdCI6MTc0NTA1NDg0MywiZXhwIjoxNzQ1MTQxMjQzfQ.IqTWKTPLc7doV7nMzWOxapxEBRqRhO9yuFfTk-LoGPA`;
    return conf;
  },
  (error) => Promise.reject(error)
);
