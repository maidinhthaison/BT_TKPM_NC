import axios from "axios";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch');
const baseURLUserService = "http://localhost:3000"; // UserService
const baseURLStatisticService = "http://localhost:3003"; // Statistic service
const baseURLOrderService = "http://localhost:3002"; // OrderService
const baseURLConfigService = "http://localhost:3004"; // ConfigService

/**
 * User Client
 */
export const apiUserClient = axios.create({
  baseURL: baseURLUserService
});

apiUserClient.interceptors.request.use(
  (conf) => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    conf.headers["Content-Type"] = "application/json";
    if(access_token !== null){
      conf.headers["Authorization"] = `Bearer ${access_token}`;
      conf.headers["Token"] = `Bearer ${refresh_token}`;
    }
    return conf;
  },
  (error) => Promise.reject(error)
);
/**
 * Statistic client
 */
export const apiStatisticClient = axios.create({
  baseURL: baseURLStatisticService
});

apiStatisticClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    const access_token = localStorage.getItem('access_token')
    if(access_token !== null){
      console.log('Authorization Bearer apiOrderClient>>>', access_token);
      conf.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return conf;
  },
  (error) => Promise.reject(error)
);

/**
 * Order Client
 */
export const apiOrderClient = axios.create({
  baseURL: baseURLOrderService
});

apiOrderClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    const access_token = localStorage.getItem('access_token')
    if(access_token !== null){
      console.log('Authorization Bearer apiOrderClient>>>', access_token);
      conf.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return conf;
  },
  (error) => Promise.reject(error)
);
/**
 * Config Client
 */
export const apiConfigClient = axios.create({
  baseURL: baseURLConfigService
});

apiConfigClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    const access_token = localStorage.getItem('access_token')
    if(access_token !== null){
      console.log('Authorization Bearer apiConfigClient>>>', access_token);
      conf.headers["Authorization"] = `Bearer ${access_token}`;
    }
    
    return conf;
  },
  (error) => Promise.reject(error)
);