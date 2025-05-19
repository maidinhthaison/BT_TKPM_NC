import express from "express";
import {  getAllLoaiPhongServiceController,
    capNhatGiaPhongServiceController
 } from "../controller/configServiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/config/getAllLoaiPhong", getAllLoaiPhongServiceController);

router.post("/config/updateUnitPrice",authMiddleware, capNhatGiaPhongServiceController); // thêm middleware để xác thực người dùng nào được sử dụng service này

export default { routes: router };
