import express from "express";
import { xuLyDangNhapController, getAllKhachHangController } from "../controller/userController.js";
const router = express.Router();

router.post("/user/login", xuLyDangNhapController);

router.get("/user/kh/getAll", getAllKhachHangController);

export default { routes: router };
