import { getAllOrdersService, getOrderDetailsService,
   getOrderDetailByIdService , searchOrderService,
   updateOrderByIdService} from "../services/orderService.js";
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

export const getOrderDetailByIdController = async (req, res, next) => {
  const orderId = req.query.oId;
  const response = await getOrderDetailByIdService(orderId);
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}

export const searchOrderController = async (req, res) => {
  const keyword = req.body.keyword;
  console.log('keyword', keyword);
  
  const response = await searchOrderService(keyword);
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}

export const updateOrderController = async (req, res) => {
  const params = req.body;
  
  const response = await updateOrderByIdService(params);
  
  if (response.status === HTTP_CODE[200].code) {
    return res.status(HTTP_CODE[200].code).send(response);
  } else {
    return res.status(HTTP_CODE[400].code).send(HTTP_CODE[400].message);
  }
}