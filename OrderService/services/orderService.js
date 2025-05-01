import { Order } from "../models/Order.js";
import fs from "fs";
import path from "path";
import { HTTP_CODE } from "../constant.js";
import {
  getAllKhachHang,
  getAllOrders,
  getAllRooms
} from "../../CommunicatorService/communicator.js";

const pathNVJson = path.join("Du_Lieu_Khach_San", "Du_Lieu", "Order");

var jsonFile = "order.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent);
};

const writeJsonToFile = async (arrayObject, pathFile) => {
  const jsonArray = JSON.stringify(arrayObject, null, 2);
  try {
    fs.writeFileSync(pathFile, jsonArray, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("Data written to file");
      }
    });
  } catch (err) {
    console.error(err);
  }
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
        const khachDatPhong = khachHang.khachHang.find(
          (kh) => kh.cccd === order.khachHangCccd
        );

        const phongDaDat = rooms.listPhong.find((r) => r.id === order.phongId);

        if (khachDatPhong !== undefined && phongDaDat !== undefined) {
          return { ...order, khachDatPhong, phongDaDat };
        }
      });

      console.log(
        `orderDetails >>> : ${JSON.stringify(orderDetails, null, 2)}`
      );

      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        orderDetails: orderDetails.filter(
          (item) => item !== null && item !== undefined
        ),
      });
    } catch (error) {
      console.log(`getOrderDetailsService 2222: ${error.message}`);
      reject({
        status: HTTP_CODE[500].code,
        message: HTTP_CODE[500].message,
      });
    }
  }).catch((error) => {
    console.log(`getOrderDetailsService 3333: ${error.message}`);
  });
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

export const getOrderDetailByIdService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await getAllOrders();
      const rooms = await getAllRooms();
      const khachHang = await getAllKhachHang();
      const orderFounded = await orders.orders.find((o) => o.id === orderId);

      const khachDatPhong = khachHang.khachHang.find(
        (kh) => kh.cccd === orderFounded.khachHangCccd
      );
      const phongDaDat = rooms.listPhong.find(
        (r) => r.id === orderFounded.phongId
      );
      if (khachDatPhong !== undefined && phongDaDat !== undefined) {
        const result = { ...orderFounded, khachDatPhong, phongDaDat };

        if (result) {
          resolve({
            status: HTTP_CODE[200].code,
            message: HTTP_CODE[200].message,
            orderDetail: result,
          });
        } else {
          resolve({
            status: HTTP_CODE[500].code,
            message: HTTP_CODE[500].message,
          });
        }
      }
    } catch (error) {
      reject({
        status: HTTP_CODE[503].code,
        message: HTTP_CODE[503].message,
      });
    }
  }).catch((e) => console.log(e));
};
/**
 * Search order service
 * @param {*} keyword
 * @returns
 */

export const searchOrderService = async (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await getAllOrders();

      const rooms = await getAllRooms();

      const khachHang = await getAllKhachHang();

      const orderDetails = orders.orders.map((order) => {
        const khachDatPhong = khachHang.khachHang.find(
          (kh) => kh.cccd === order.khachHangCccd
        );

        const phongDaDat = rooms.listPhong.find((r) => r.id === order.phongId);

        if (khachDatPhong !== undefined && phongDaDat !== undefined) {
          return { ...order, khachDatPhong, phongDaDat };
        }
      });
      const removeNull = orderDetails.filter(
        (item) => item !== null && item !== undefined
      );

      const result = removeNull.filter(
        (item) =>
          item.ngayThue.toLowerCase().includes(keyword.toLowerCase()) ||
          item.ngayTra.toLowerCase().includes(keyword.toLowerCase()) ||
          item.phongDaDat.loaiPhong.tenLoaiPhong
            .toLowerCase()
            .includes(keyword.toLowerCase())
      );
      console.log(`searchOrder >>> : ${JSON.stringify(result, null, 2)}`);

      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        orderDetails: result,
      });
    } catch (error) {
      console.log(`searchOrderService 2222: ${error.message}`);
      reject({
        status: HTTP_CODE[500].code,
        message: HTTP_CODE[500].message,
      });
    }
  }).catch((error) => {
    console.log(`searchOrderService 3333: ${error.message}`);
  });
};
/**
 * update order by Id
 * @param {*} orderId
 * @returns
 */
export const updateOrderByIdService = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const orders = await getAllOrders();
      
      const khachHang = await getAllKhachHang();

      const orderFounded = await orders.orders.find(
        (o) => o.id === params.orderId
      );

      if (orderFounded) {
        // update order
        orderFounded.ngayThue = params.ngayThue;
        orderFounded.ngayTra = params.ngayTra;
        orderFounded.tongtien = params.tongtien;
        const khachDatPhong = await khachHang.khachHang.find(
          (kh) => kh.cccd === orderFounded.khachHangCccd
        );
       
        writeJsonToFile(orders.orders, `./${pathNVJson}/${jsonFile}`);
       
        const result = { ...orderFounded, khachDatPhong };
        if (result) {
          resolve({
            status: HTTP_CODE[200].code,
            message: HTTP_CODE[200].message,
            orderDetail: result,
          });
        } else {
          resolve({
            status: HTTP_CODE[500].code,
            message: HTTP_CODE[500].message,
          });
        }
      } else {
        resolve({
          status: HTTP_CODE[400].code,
          message: HTTP_CODE[400].message,
        });
      }
    } catch (error) {
      reject({
        status: HTTP_CODE[503].code,
        message: HTTP_CODE[503].message,
      });
    }
  }).catch((error) => {
    console.log(`updateOrderByIdService 3333: ${error.message}`);
  });
};
