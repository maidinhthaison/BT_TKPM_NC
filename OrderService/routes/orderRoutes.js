import express from "express";
import { getAllOrdersController , 
    getOrdersDetailsController, 
    getOrderDetailByIdController,
    searchOrderController,
    updateOrderController} from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/order/getAll", getAllOrdersController);

router.get("/order/getOrderDetails",authMiddleware, getOrdersDetailsController); // thêm middleware để xác thực người dùng nào được sử dụng service này

router.get("/order/getOrderDetailsById",authMiddleware, getOrderDetailByIdController); // thêm middleware để xác thực người dùng nào được sử dụng service này

router.post("/order/searchOrder",authMiddleware, searchOrderController); // thêm middleware để xác thực người dùng nào được sử dụng service này

router.post("/order/updateOrderById",authMiddleware, updateOrderController); // thêm middleware để xác thực người dùng nào được sử dụng service này

export default { routes: router };
