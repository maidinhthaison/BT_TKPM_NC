import { log } from "console";
import { Phong } from "../model/Phong.js";
import fs from "fs";
import path from "path";

var pathPhongJson = path.join("Du_Lieu_Phong", "Du_Lieu", "Phong");
var jsonFile = "phong.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathPhongJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent);
};

export const xulyGetAllRooms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listPhongJson = parseJson();
    //   const listPhong = Phong.fromJsonArray(listPhongJson);
    //   listPhong.forEach((phong) => {
    //     console.log(`Phong: ${JSON.stringify(phong)}`);
    //   });
      //console.log(`Phong: ${JSON.stringify(phong)}`);
      if (listPhongJson) {
        resolve({
          status: "OK",
          listPhong: listPhongJson
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
