import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { log } from "console";


const pathNVJson = path.join("Du_Lieu_Khach_San", "Du_Lieu", "Nhan_Vien");

var jsonFile = "nhanvien.json";

const parseJson = () => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFile}`, "utf8");
  return JSON.parse(fileContent); // Parse the JSON string into an object
};

export function createNhanVienList() {
  const nhanVienArray = parseJson();
  return nhanVienArray.map((item) => new User(
    item.hoTen,
    item.maSo,  
    item.tenDangNhap,
    item.matKhau,
    item.dienThoai,
    item.khuVuc
  ));
}

export const xuLyDangNhapService = (maSo, matKhau) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`maSo: ${maSo}, matKhau: ${matKhau}`);
      
      let arrayNhanVien = createNhanVienList();
      console.log(`arrayNhanVien: ${JSON.stringify(arrayNhanVien, null, 2)}`);
      // Check if the user exists
      const user = arrayNhanVien.find(
        user => user.maSo === maSo && user.matKhau === matKhau
      );
      console.log(`user: ${JSON.stringify(user, null, 2)}`);
      
      if (user != undefined) {
        resolve({
          status: "OK",
          user: user,
          message: "Đăng nhập thành công",
        });
      } else {
        reject({
          status: "401",
          message: "Người dùng không tồn tại",
        });
      }
    } catch (error) {
      reject({
        status: "500",
        message: "Lỗi server",
      });
    }
  });
};
