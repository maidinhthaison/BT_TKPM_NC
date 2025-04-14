import fs from "fs";
import path from "path";
import { Phong } from "../model/Phong.js";
var pathPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "Phong");
var jsonFile = "phong.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathPhongJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent); // Parse the JSON string into an object
};

function fromJsonArray(listPhongObject) {
  return listPhongObject.map((item) => new Phong(item));
}

export const xulyGetAllRooms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listPhongObject = parseJson();

      const mappedRooms = fromJsonArray(listPhongObject);

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
      const listPhongObject = parseJson();

      const mappedRooms = fromJsonArray(listPhongObject);

      // Convert keyword to lowercase for case-insensitive search
      const lowerCaseKeyword = keyword.toLowerCase();

      // Filter rooms based on the keyword
      const searchResult = mappedRooms.filter((room) => {
        return (
          room.tenPhong.toLowerCase().includes(lowerCaseKeyword) || // Search by room name
          room.tang.tenTang.toLowerCase().includes(lowerCaseKeyword) || // Search by floor name
          room.loaiPhong.cauHinh.dongiaPhong
            .toString()
            .includes(lowerCaseKeyword) || // Search by price
          room.loaiPhong.cauHinh.khachToiDa
            .toString()
            .includes(lowerCaseKeyword) || // Search by max guests
          room.trangThai.toLowerCase().includes(lowerCaseKeyword) // Search by status
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
