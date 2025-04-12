import express from "express";
import { getAllRooms } from "../controller/roomController.js";
const router = express.Router();

router.get("/room/getAll", getAllRooms);

export default { routes: router };
