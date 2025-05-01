import axios from "axios";

export const baseURLUserService = "http://localhost:3000"; // UserService
const baseURLRoomService = "http://localhost:3001"; // RoomService
const baseURLOrderService = "http://localhost:3002"; // OrderService


export const apiRoomClient = axios.create({
  baseURL: baseURLRoomService,
});
apiRoomClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    return conf;
  },
  (error) => Promise.reject(error)
);
/**
 * 
 */
export const apiOrderlient = axios.create({
  baseURL: baseURLOrderService,
});
apiOrderlient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    return conf;
  },
  (error) => Promise.reject(error)
);
/**
 * 
 */
export const apiKhachHangClient = axios.create({
  baseURL: baseURLUserService,
});
apiKhachHangClient.interceptors.request.use(
  (conf) => {
    conf.headers["Content-Type"] = "application/json";
    return conf;
  },
  (error) => Promise.reject(error)
);
