import express from "express";
import authMiddleware  from "../middleware/authMiddleware.js";
import { dangNhap } from "../controller/userController.js";
const router = express.Router();

router.post("/user/login", dangNhap);

export default { routes: router };
