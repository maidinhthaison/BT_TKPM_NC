import { CauHinh } from "../models/CauHinh.js";
import fs from "fs";
import path from "path";
import { HTTP_CODE } from "../constant.js";
import {
  getAllKhachHang,
  getAllOrders,
  getAllRooms,
  getAllLoaiPhong
} from "../../CommunicatorService/communicator.js";

const pathNVJson = path.join("Du_Lieu_Cau_Hinh", "Du_Lieu", "CauHinh");

var jsonFile = "cauhinh.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent);
};

const writeJsonToFile = async (arrayObject, pathFile) => {
  const jsonArray = JSON.stringify(arrayObject, null, 2);
  try {
    fs.writeFileSync(pathFile, jsonArray, "utf8", (err) => {
      if (err) {
        console.error(`Lỗi ghi file ${jsonFile} - ${err}`);
      } else {
        console.error(`Ghi file ${jsonFile} thành công`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

function createConfigList() {
  const configArray = parseJson();
  return configArray.map(
    (item) =>
      new CauHinh(item.id, item.khachToiDa, item.dongiaPhong, item.ngayCapNhat)
  );
}


export const getAllConfigService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrayConfig = await createConfigList();

      if (arrayConfig) {
        resolve({
          status: HTTP_CODE[200].code,
          message: HTTP_CODE[200].message,
          arrayConfig: arrayConfig,
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