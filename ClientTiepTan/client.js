import axios from "axios";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch');
const baseURLUserService = "http://localhost:3000"; // UserService
const baseURLOrderService = "http://localhost:3002"; // UserService

export const apiUserClient = axios.create({
  baseURL: baseURLUserService
});
const access_token = localStorage.getItem('access_token')
console.log('Authorization Bearer>>>', access_token);

apiUserClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    conf.headers["Authorization"] = `Bearer ${access_token}`;
    return conf;
  },
  (error) => Promise.reject(error)
);

export const apiOrderClient = axios.create({
  baseURL: baseURLOrderService
});

apiOrderClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    conf.headers["Authorization"] = `Bearer ${access_token}`;
    return conf;
  },
  (error) => Promise.reject(error)
);
