import express from "express";
import { getAllRoomsController, searchRoomsController, getAllLoaiPhongController } from "../controller/roomController.js";
const router = express.Router();

router.get("/room/getAll", getAllRoomsController);
router.get("/room/getAllLoaiPhong", getAllLoaiPhongController);
router.post("/room/search", searchRoomsController);

export default { routes: router };
