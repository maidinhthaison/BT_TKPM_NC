
import { HTTP_CODE } from "../constant.js";
import {
  getAllLoaiPhong,
  capNhatGiaPhong
} from "../../CommunicatorService/communicator.js";

export const getAllLoaiPhongService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrayLoaiPhong = await getAllLoaiPhong();

      if (arrayLoaiPhong) {
        resolve({
          status: HTTP_CODE[200].code,
          message: HTTP_CODE[200].message,
          arrayLoaiPhong: arrayLoaiPhong.loaiPhongArray,
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

export const capNhatGiaPhongService = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result  = await capNhatGiaPhong(params);
      if (result) {
        resolve({
          status: HTTP_CODE[200].code,
          message: HTTP_CODE[200].message,
          arrayLoaiPhong : result.loaiPhong,
          arrayCauHinh: result.cauHinh,
          loaiPhongId: params.loaiPhongId
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


