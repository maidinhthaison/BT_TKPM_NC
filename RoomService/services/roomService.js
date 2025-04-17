import fs from "fs";
import path, { parse } from "path";
import { Phong } from "../model/Phong.js";

const pathPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "Phong");

var jsonFile = "phong.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathPhongJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent); // Parse the JSON string into an object
};

export function createPhongList() {
  const phongArray = parseJson();
  return phongArray.map((item) => new Phong(
    item.id,
    item.tenPhong,
    item.trangThai,
    item.loaiPhong,
    item.khuVuc,
    item.hinh
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
