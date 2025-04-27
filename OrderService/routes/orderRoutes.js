import express from "express";
import { getAllOrdersController , getOrdersDetailsController} from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/order/getAll", getAllOrdersController);

router.get("/order/getOrderDetails",authMiddleware, getOrdersDetailsController); // thêm middleware để xác thực người dùng nào được sử dụng service này

export default { routes: router };
