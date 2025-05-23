import { User } from "../models/User.js";
import { KhachHang } from "../models/KhachHang.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { config } from "../config.js";
import { HTTP_CODE, MESSAGE } from "../constant.js";
const pathNVJson = path.join("Du_Lieu_Khach_San", "Du_Lieu", "Nhan_Vien");

const jsonNhanVienFile = "nhanvien.json";

const jsonKhachHangFile = "khachhang.json";
//http://localhost:3000/Du_Lieu/Nhan_Vien/khachhang.json

const parseJson = (jsonFileName) => {
  let fileContent = fs.readFileSync(`./${pathNVJson}/${jsonFileName}`, "utf8");
  let array = JSON.parse(fileContent);
  // Hash the password for each user with unique salt = 10
  // array.forEach((item) => {
  //   console.log(`item.matKhau: ${item.matKhau}`);
  //   item.matKhau = bcrypt.hashSync(item.matKhau, 10);
  // });
  return array; // Parse the JSON string into an object
};

export function createNhanVienList() {
  const nhanVienArray = parseJson(jsonNhanVienFile);
  return nhanVienArray.map(
    (item) =>
      new User(
        item.hoTen,
        item.maSo,
        item.tenDangNhap,
        item.matKhau,
        item.dienThoai,
        item.khuVuc
      )
  );
}

export const xuLyDangNhapService = async (maSo, matKhau) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`maSo: ${maSo}, matKhau: ${matKhau}`);

      let arrayNhanVien = await createNhanVienList();

      // Check if the user exists
      const matchUser = await arrayNhanVien.find((user) => user.maSo === maSo);
      if (matchUser) {
        //check password
        const plainPassword = matKhau;
        const hashedPassword = matchUser.matKhau;

        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log(`isMatch: ${isMatch}`);

        if (!isMatch) {
          resolve({
            status: HTTP_CODE[401].code,
            message: HTTP_CODE[401].message,
          });
        } else {
          // Generate access token
          const accessToken = generateAcessToken({
            maSo: matchUser.maSo,
          });
          // Generate refresh token
          const refreshToken = generateRefreshToken({
            maSo: matchUser.maSo,
            hoTen: matchUser.hoTen,
          });

          resolve({
            status: HTTP_CODE[200].code,
            message: HTTP_CODE[200].message,
            data: {
              accessToken,
              refreshToken,
              user: {
                hoTen: matchUser.hoTen,
                maSo: matchUser.maSo,
                dienThoai: matchUser.dienThoai,
                khuVuc: matchUser.khuVuc,
              },
            },
          });
        }
      } else {
        resolve({
          status: HTTP_CODE[401].code,
          message: HTTP_CODE[401].message,
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

export function createKhachHangList() {
  const khachHangArray = parseJson(jsonKhachHangFile);
  return khachHangArray.map(
    (item) =>
      new KhachHang(
        item.cccd,
        item.hoTen,
        item.ngaySinh,
        item.diaChi,
        item.dienThoai
      )
  );
}
export const getAllKhachHangService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrayKh = await createKhachHangList();

      if (arrayKh) {
        resolve({
          status: HTTP_CODE[200].code,
          message: HTTP_CODE[200].message,
          khachHang: arrayKh,
        });
      } else {
        resolve({
          status: HTTP_CODE[401].code,
          message: HTTP_CODE[401].message,
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

const generateAcessToken = (data) => {
  const access_token = jwt.sign(data, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiresIn,
  });
  return access_token;
};

const generateRefreshToken = (data) => {
  const access_token = jwt.sign(data, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
  return access_token;
};

export const refreshTokenService = async (refreshToken) => {
  return await new Promise((resolve, reject) => {
    try {
      
      jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
        if (err) {
          resolve({
            status: HTTP_CODE[401].code,
            message: `${HTTP_CODE[401].message} - The user is not authentication`,
          });
        } else {
          if (user) {
            const newAcessToken = generateAcessToken({ maSo: user.maSo });
            resolve({
              status: HTTP_CODE[200].code,
              message: HTTP_CODE[200].message,
              access_token: newAcessToken,
            });
          } else {

            resolve({
              status: HTTP_CODE[401].code,
              message: `${HTTP_CODE[401].message} - The user is not authentication`,
            });
          }
        }
      });
    } catch (error) {
      console.log('4444: ', error);
      reject({
        status: HTTP_CODE[503].code,
        message: HTTP_CODE[503].message,
      });
    }
  });
};
