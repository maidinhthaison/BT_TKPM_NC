import express from "express";
import { getAllOrdersController , getOrdersDetailsController} from "../controller/orderController.js";
const router = express.Router();

router.get("/order/getAll", getAllOrdersController);

router.get("/order/getOrderDetails", getOrdersDetailsController);

export default { routes: router };
