import express from "express";
import { getAllConfigServiceController, getAllLoaiPhongServiceController } from "../controller/configServiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/config/getAll",authMiddleware, getAllConfigServiceController); // thêm middleware để xác thực người dùng nào được sử dụng service này

router.get("/config/getAllLoaiPhong",authMiddleware, getAllLoaiPhongServiceController); // thêm middleware để xác thực người dùng nào được sử dụng service này


export default { routes: router };
