import fs from "fs";
import path, { parse } from "path";
import { Phong } from "../models/Phong.js";
import { LoaiPhong } from "../models/LoaiPhong.js";


const pathPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "Phong");
const pathLoaiPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "LoaiPhong");

const  phongJsonFile = "phong.json";
const  loaiPhongJsonFile = "loaiphong.json";

const parseJson = (pathFile, jsonFile) => {
  let fileContent = fs.readFileSync(`./${pathFile}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent); // Parse the JSON string into an object
};

export function createPhongList() {
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

export function taoDsLoaiPhong() {
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

export const xulyGetAllRooms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const mappedRooms = createPhongList();
     
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

export const searchRooms = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mappedRooms = createPhongList();
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

export const getAllLoaiPhongService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const loaiPhongArray = taoDsLoaiPhong()
     
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
