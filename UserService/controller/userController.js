import {
  xuLyDangNhapService,
  getAllKhachHangService,
  refreshTokenService
} from "../services/UserService.js";
import { HTTP_CODE } from "../constant.js";
export const xuLyDangNhapController = async (req, res) => {
  const params = req.body;
  //const authorization = req.headers.authorization.split(" ")[1];
  // if (!authorization) {
  //   return res.json({
  //     status: HTTP_CODE[403].code,
  //     message: HTTP_CODE[403].message,
  //   });
  // }
  if (!params) {
    return res.json({
      status: HTTP_CODE[400].code,
      message: HTTP_CODE[400].message,
    });
  }
  const response = await xuLyDangNhapService(
    params.maSo,
    params.matKhau
  );
  
  return res.json(response);
};

export const getAllKhachHangController = async (req, res) => {
  const response = await getAllKhachHangService();
  return res.json(response);
};

export const userRefreshTokenController = async (req, res) => {
  try {
   
    const bearer = req.headers.authorization.split(' ')[1];

    if (!bearer) {
        console.log('Refresh token is not valid');

        return res.status(HTTP_CODE[404].code).json({
          message: HTTP_CODE[404].message,
        });
    }else{
        console.log('Bearer userRefreshTokenController : ', bearer);
        const response = await refreshTokenService(bearer);
        return res.status(HTTP_CODE[200].code).json(response);
    }
  } catch (error) {
    console.log(error);
    
    return res.status(HTTP_CODE[500].code).json({
      message: HTTP_CODE[500].message,
    });
  }
};
