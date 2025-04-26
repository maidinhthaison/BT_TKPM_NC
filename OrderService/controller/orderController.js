import { getAllOrdersService, getOrderDetailsService } from "../services/orderService.js";
import { HTTP_CODE } from "../constant.js";

export const getAllOrdersController = async (req, res, next) => {
  const response = await getAllOrdersService();
  
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}

export const getOrdersDetailsController = async (req, res, next) => {
  const response = await getOrderDetailsService();
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}
