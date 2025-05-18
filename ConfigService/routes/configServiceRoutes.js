import express from "express";
import {  getAllLoaiPhongServiceController,
    capNhatGiaPhongServiceController
 } from "../controller/configServiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Chưa xử lý được triệt để phần middleware này khi access_token hết hạn nên tạm bỏ qua phần này

// router.get("/config/getAllLoaiPhong",authMiddleware, getAllLoaiPhongServiceController); // thêm middleware để xác thực người dùng nào được sử dụng service này
router.get("/config/getAllLoaiPhong", getAllLoaiPhongServiceController);

//router.post("/config/updateUnitPrice",authMiddleware, capNhatGiaPhongServiceController); // thêm middleware để xác thực người dùng nào được sử dụng service này
router.post("/config/updateUnitPrice", capNhatGiaPhongServiceController);

export default { routes: router };
