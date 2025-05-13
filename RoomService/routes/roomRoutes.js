import express from "express";
import { getAllRoomsController, searchRoomsController, 
    getAllLoaiPhongController, capNhatGiaTheoLoaiPhongController } from "../controller/roomController.js";
const router = express.Router();

router.get("/room/getAll", getAllRoomsController);
router.get("/room/getAllLoaiPhong", getAllLoaiPhongController);
router.post("/room/search", searchRoomsController);
router.post("/room/updateRoomUnitPrice", capNhatGiaTheoLoaiPhongController);

export default { routes: router };
