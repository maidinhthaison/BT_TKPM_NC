import { Order } from "../models/Order.js";
import fs from "fs";
import path from "path";
import { HTTP_CODE } from "../constant.js";
import { getAllKhachHang, getAllOrders, getAllRooms } from "../../CommunicatorService/communicator.js";

const pathNVJson = path.join("Du_Lieu_Khach_San", "Du_Lieu", "Order");

var jsonFile = "order.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent);
};

export function createOrderList() {
  const orderArray = parseJson();
  return orderArray.map(
    (item) =>
      new Order(
        item.id,
        item.ngayThue,
        item.ngayTra,
        item.tongtien,
        item.khachHang
      )
  );
}

export const getOrderDetailsService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await getAllOrders();
      console.log(`getOrders>>>`, JSON.stringify(orders, null, 2));
      
      
      const rooms = await getAllRooms();
      console.log(`getRooms>>>`, JSON.stringify(rooms,  null, 2));

      const khachHang = await getAllKhachHang();
      console.log(`getAllKhachHang>>>`, JSON.stringify(khachHang, null, 2));
      
     
      const detailedOrders = orders.orders.map((order) => {
        const user = khachHang.khachHang.find(u => u.cccd === order.cccd);
        const room = rooms.listPhong.find((p) => p.id === order.id);
        return { ...order, room };
      });
      console.log(`detailedOrders>>>`, JSON.stringify(detailedOrders, null, 2));
      
      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        detailedOrders: []
      });

    } catch (error) {
      console.log(`getOrderDetailsService error: ${error}`);
      
      reject({
        status: HTTP_CODE[503].code,
        message: HTTP_CODE[503].message,
      });
    }
  }).catch((e) => console.log(e));
};

export const getAllOrdersService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrayOrder = await createOrderList();
    
      if (arrayOrder) {
        resolve({
          status: HTTP_CODE[200].code,
          message: HTTP_CODE[200].message,
          orders: arrayOrder,
        });
      } else {
        resolve({
          status: HTTP_CODE[500].code,
          message: HTTP_CODE[500].message,
        });
      }
    } catch (error) {
      reject({
        status: HTTP_CODE[503].code,
        message: HTTP_CODE[503].message,
      });
    }
  }).catch((e) => console.log(e));
};
