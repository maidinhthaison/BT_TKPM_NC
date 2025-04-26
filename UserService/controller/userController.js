import { xuLyDangNhapService, getAllKhachHangService } from "../services/UserService.js";
import { HTTP_CODE } from "../constant.js";
export const xuLyDangNhapController = async (req, res, next) => {
  const params = req.body.params;
  const authorization = req.headers.authorization.split(' ')[1]  
  if(!authorization){
    return res.json({ 
      status: HTTP_CODE[403].code,
      message: HTTP_CODE[403].message,
    });
  }
  if (!params) {
    return res.json({ 
      status: HTTP_CODE[400].code,
      message: HTTP_CODE[400].message,
    });
  }
  const response = await xuLyDangNhapService(params.maSo, params.matKhau, authorization); 
  console.log(`response : ${JSON.stringify(response, null, 2)}`);
  
  return res.json(response)
};

export const getAllKhachHangController = async (req, res, next) => {
  const response = await getAllKhachHangService(); 
  return res.json(response)
};