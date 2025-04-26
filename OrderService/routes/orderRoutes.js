import express from "express";
import { getAllOrdersController , getOrdersDetailsController} from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/order/getAll", getAllOrdersController);

router.get("/order/getOrderDetails",authMiddleware, getOrdersDetailsController);

export default { routes: router };
