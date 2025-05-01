import express from "express";
import { xuLyDangNhapController, getAllKhachHangController, userRefreshTokenController } from "../controller/userController.js";
const router = express.Router();

router.post("/user/login", xuLyDangNhapController);

router.get("/user/kh/getAll", getAllKhachHangController);

router.post("/user/refreshToken", userRefreshTokenController);

export default { routes: router };
