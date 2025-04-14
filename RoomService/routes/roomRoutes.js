import express from "express";
import { getAllRoomsController, searchRoomsController } from "../controller/roomController.js";
const router = express.Router();

router.get("/room/getAll", getAllRoomsController);
router.post("/room/search", searchRoomsController);

export default { routes: router };
