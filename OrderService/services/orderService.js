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
        item.khachHangCccd,
        item.phongId
      )
  );

}

export const getOrderDetailsService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await getAllOrders();
      
      const rooms = await getAllRooms();
    
      const khachHang = await getAllKhachHang();
     
      const orderDetails = orders.orders.map((order) => {
        
        const khachDatPhong = khachHang.khachHang.find(kh => kh.cccd === order.khachHangCccd);
       
        const phongDaDat = rooms.listPhong.find((r) => r.id === order.phongId);
       
        if(khachDatPhong !== undefined && phongDaDat !== undefined){
          return { ...order, khachDatPhong, phongDaDat };
        }
        
          
      });
      //console.log(`orderDetails>>>`, JSON.stringify(detailedOrders, null, 2));
      
      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        orderDetails: orderDetails
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
