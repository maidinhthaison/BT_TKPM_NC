import { xuLyDangNhapService, getAllKhachHangService } from "../services/UserService.js";
import { MESSAGE, HTTP_CODE } from "../constant.js";
export const xuLyDangNhapController = async (req, res, next) => {
  const params = req.body.params;
  if (!params) {
    return res.json({ 
      status: HTTP_CODE[400].code,
      message: HTTP_CODE[400].message,
    });
  }
  const response = await xuLyDangNhapService(params.maSo, params.matKhau); 
  return res.json(response)
};

export const getAllKhachHangController = async (req, res, next) => {
  const response = await getAllKhachHangService(); 
  return res.json(response)
};