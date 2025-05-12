import { HTTP_CODE } from "../constant.js";
import {
  getAllKhachHang,
  getAllOrders,
  getAllRooms,
} from "../../CommunicatorService/communicator.js";
import { getMonthYearFromString } from "../utils.js";

export const getStatisticByMonthService = async (dateString) => {
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

      const dateStr = getMonthYearFromString(dateString);

      const result = [];
      let totalIncome = 0;
      let totalByMonth = 0;
      
      orderDetails.forEach((element) => {
        totalIncome += parseFloat(element.tongtien);
        const date = getMonthYearFromString(element.ngayThue);
        if (date.year === dateStr.year && date.month === dateStr.month) {
          totalByMonth += parseFloat(element.tongtien);
          result.push(element);
        }
      });

      const grouped = result.reduce((acc, item) => {
        const key = item.phongDaDat.loaiPhong.tenLoaiPhong;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});

      let totalByCate = [];

      for (const key in grouped) {
        let item = grouped[key];
        let totalIncomeByCate = 0;
        item.forEach((element) => {
          totalIncomeByCate += parseFloat(element.tongtien);
        });

        totalByCate.push({
          type: key,
          income: totalIncomeByCate,
          tyle: parseFloat(
            ((totalIncomeByCate / totalByMonth) * 100).toFixed(2)
          ),
        });
      }
      const summary = {
        date: dateStr,
        totalByMonth: totalByMonth,
        totalIncome: totalIncome,
        totalByCate: totalByCate,
      };

      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        statistic: grouped,
        summary: summary,
      });
    } catch (error) {
      console.log(`getStatisticByMonthService 2222: ${error.message}`);
      reject({
        status: HTTP_CODE[500].code,
        message: HTTP_CODE[500].message,
      });
    }
  }).catch((error) => {
    console.log(`getStatisticByMonthService 3333: ${error.message}`);
  });
};

export const getStatisticByYearService = async (dateString) => {
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

      const dateStr = getMonthYearFromString(dateString);

      const result = [];
      let totalIncome = 0;
      let totalByYear = 0;
      orderDetails.forEach((element) => {
        totalIncome += parseFloat(element.tongtien);
        const date = getMonthYearFromString(element.ngayThue);
        if (date.year === dateStr.year) {
          totalByYear += parseFloat(element.tongtien);
          result.push(element);
        }
      });

      const grouped = result.reduce((acc, item) => {
        const date = getMonthYearFromString(item.ngayThue);
        const key = date.month;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});

      let totalByCate = [];

      for (const key in grouped) {
        let item = grouped[key];
        let totalIncomeByCate = 0;
        item.forEach((element) => {
          totalIncomeByCate += parseFloat(element.tongtien);
        });

        totalByCate.push({
          type: key,
          income: totalIncomeByCate,
          tyle: parseFloat(
            ((totalIncomeByCate / totalByYear) * 100).toFixed(2)
          ),
        });
      }
      const summary = {
        date: dateStr,
        totalByYear: totalByYear,
        totalIncome: totalIncome,
        totalByCate: totalByCate,
      };

      resolve({
        status: HTTP_CODE[200].code,
        message: HTTP_CODE[200].message,
        statistic: grouped,
        summary: summary,
      });
    } catch (error) {
      console.log(`getStatisticByYearService 2222: ${error.message}`);
      reject({
        status: HTTP_CODE[500].code,
        message: HTTP_CODE[500].message,
      });
    }
  }).catch((error) => {
    console.log(`getStatisticByYearService 3333: ${error.message}`);
  });
};