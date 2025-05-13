import {
  getAllLoaiPhongService,
  capNhatGiaPhongService
} from "../services/configService.js";
import { HTTP_CODE } from "../constant.js";

export const getAllLoaiPhongServiceController = async (req, res, next) => {
  const response = await getAllLoaiPhongService();
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
};

export const capNhatGiaPhongServiceController = async (req, res, next) => {
  const params = req.body;
  const response = await capNhatGiaPhongService(params);
  console.log('response>>>', JSON.stringify(response, null, 2));
  
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
};
