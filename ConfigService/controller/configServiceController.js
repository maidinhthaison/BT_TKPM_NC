import { getAllConfigService, getAllLoaiPhongService } from "../services/configService.js";
 import { HTTP_CODE } from "../constant.js";
 
 export const getAllConfigServiceController = async (req, res, next) => {
   const response = await getAllConfigService();
   console.log(JSON.stringify(response, null, 2));
   
   if (response.status === HTTP_CODE[200].code) {
     return res.status(HTTP_CODE[200].code).send(response);
   } else {
     return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
   }
 };

 export const getAllLoaiPhongServiceController = async (req, res, next) => {
  const response = await getAllLoaiPhongService();
  console.log('>>>>>>getAllLoaiPhongServiceController: ', JSON.stringify(response, null, 2));
  
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}


 