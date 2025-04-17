import express from "express";
import authMiddleware  from "../middleware/authMiddleware.js";
import { xuLyDangNhapController } from "../controller/userController.js";
const router = express.Router();

router.post("/user/login", xuLyDangNhapController);

export default { routes: router };
