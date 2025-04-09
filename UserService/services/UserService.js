import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

var pathFile = path.join("Du_Lieu_Khach_San", "Du_Lieu", "Nhan_Vien");
var jsonNhanVienPathFile = "nhanvien.json";
var jsonKhachHangPathFile = "khachhang.json";

const parseJsonNhanVien = () => {
  let fileContent = fs.readFileSync(
    `./${pathFile}/${jsonNhanVienPathFile}`,
    "utf8"
  );
  return JSON.parse(fileContent);
};

const parseJsonKhachHang = () => {
  let fileContent = fs.readFileSync(
    `./${pathFile}/${jsonKhachHangPathFile}`,
    "utf8"
  );
  return JSON.parse(fileContent);
};

export const xuLyDangNhap = (maSo, matKhau) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrayNhanVien = parseJsonNhanVien();
      //let arrayKhachHang = parseJsonKhachHang();
      const user = arrayNhanVien.find(
        user => user.maSo === maSo && user.matKhau === matKhau
      );
      
      if (user) {
        resolve({
          status: "OK",
          user: user
        });
      } else {
        reject({
          status: "error",
          message: "Người dùng không tồn tại",
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
