import fs from "fs";
import path, { parse } from "path";
import { Phong } from "../models/Phong.js";
import { LoaiPhong } from "../models/LoaiPhong.js";
import { CauHinh } from "../models/CauHinh.js";
import { getDateWithFormat } from '../utils.js'


const pathPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "Phong");
const pathLoaiPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "LoaiPhong");
const pathCauHinhJson = path.join("Du_Lieu_Phong", "Du_Lieu", "CauHinh");

const  phongJsonFile = "phong.json";
const  loaiPhongJsonFile = "loaiphong.json";
const  cauHinhJsonFile = "cauhinh.json";

const parseJson = (pathFile, jsonFile) => {
  let fileContent = fs.readFileSync(`./${pathFile}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent); // Parse the JSON string into an object
};

function createPhongList() {
  const phongArray = parseJson(pathPhongJson, phongJsonFile);
  return phongArray.map((item) => new Phong(
    item.id,
    item.tenPhong,
    item.trangThai,
    item.loaiPhong,
    item.khuVuc,
    item.hinh
  ));
  
}

function taoDsLoaiPhong() {
  const loaiPhongArray = parseJson(pathLoaiPhongJson, loaiPhongJsonFile);
  return loaiPhongArray.map((item) => new LoaiPhong(
    item.id,
    item.tenLoaiPhong,
    item.dongiaPhong,
    item.tienNghi,
    item.khachToiDa,
    item.cauHinh
  ));
  
}
function taoDsCauHinh() {
  const cauHinhArray = parseJson(pathCauHinhJson, cauHinhJsonFile);
  return cauHinhArray.map((item) => new CauHinh(
    item.id,
    item.khachToiDa,
    item.dongiaPhong,
    item.ngayCapNhat
  ));
  
}

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

export const xulyGetAllRooms = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const mappedRooms = await createPhongList();
     
      if (mappedRooms) {
        resolve({
          status: "OK",
          listPhong: mappedRooms,
        });
      } else {
        reject({
          status: "error",
          message: "No rooms found",
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const searchRooms = async (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mappedRooms = await createPhongList();
      // Convert keyword to lowercase for case-insensitive search
      const lowerCaseKeyword = keyword.toLowerCase();

      // Filter rooms based on the keyword
      const searchResult = mappedRooms.filter(room => {
        return (
          room.tenPhong.toLowerCase().includes(lowerCaseKeyword) || 
          room.khuVuc.tenKv.toLowerCase().includes(lowerCaseKeyword) || 
          room.loaiPhong.cauHinh.dongiaPhong
            .toString()
            .includes(lowerCaseKeyword) || 
          room.loaiPhong.cauHinh.khachToiDa
            .toString()
            .includes(lowerCaseKeyword) ||
          room.trangThai.toLowerCase().includes(lowerCaseKeyword) 
        );
      });
      console.log(`searchResult: ${searchResult.length}`);

      resolve({
          status: "OK",
          listPhong: searchResult,
        });
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const getAllLoaiPhongService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const loaiPhongArray = await taoDsLoaiPhong()
     
      if (loaiPhongArray) {
        resolve({
          status: "OK",
          loaiPhongArray: loaiPhongArray,
        });
      } else {
        reject({
          status: "error",
          message: 'Lỗi : Không có loại phòng',
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const capNhatGiaTheoLoaiPhongService = async (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const loaiPhongId =  params.loaiPhongId;
      const dongiaPhongMoi = params.dongiaPhong;
      const cauHinhId = params.cauHinhId;
      const loaiPhongArray = await taoDsLoaiPhong()
      if (loaiPhongArray) {
        const currentDate = getDateWithFormat();

        // Lấy loại phòng theo Id 
        const loaiPhongFounded = loaiPhongArray.find(item => item.id === loaiPhongId)
        // Cập nhật giá phòng 
        loaiPhongFounded.dongiaPhong = dongiaPhongMoi;
        loaiPhongFounded.cauHinh.dongiaPhong = dongiaPhongMoi;
        loaiPhongFounded.cauHinh.ngayCapNhat = currentDate;
        // Lấy cấu hình theo Id
        const cauHinhArray = await taoDsCauHinh();
        const cauHinhFounded = cauHinhArray.find(item => item.id === cauHinhId)
      
        // cập nhật cấu hình
        cauHinhFounded.dongiaPhong = dongiaPhongMoi;
        cauHinhFounded.ngayCapNhat = currentDate;
        // cập nhật xuống file json
        const loaiPhongArrrayUpdate = loaiPhongArray.map(item =>
          item.id === loaiPhongFounded.id ? loaiPhongFounded : item
        );

        const cauHinhArrrayUpdate = cauHinhArray.map(item =>
          item.id === cauHinhFounded.id ? cauHinhFounded : item
        );

        await writeJsonToFile(cauHinhArrrayUpdate, `./${pathCauHinhJson}/${cauHinhJsonFile}`);
        await writeJsonToFile(loaiPhongArrrayUpdate, `./${pathLoaiPhongJson}/${loaiPhongJsonFile}`);
        resolve({
          status: "OK",
          loaiPhong: loaiPhongArrrayUpdate,
          cauHinh : loaiPhongArrrayUpdate
        });
      } else {
        reject({
          status: "error",
          message: 'Lỗi : Không có loại phòng',
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};
