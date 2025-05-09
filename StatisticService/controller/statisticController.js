import { getStatisticByMonthService} from "../services/statisticService.js";
 import { HTTP_CODE } from "../constant.js";
 
 
 export const getStatisticByMonthController = async (req, res) => {
   const monthString = req.body.month;
   const response = await getStatisticByMonthService(monthString);
   console.log('res>>', JSON.stringify(response, null, 2));
   
   if (response.status === HTTP_CODE[200].code) {
     return res.status(HTTP_CODE[200].code).send(response);
   } else {
     return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
   }
 }
 