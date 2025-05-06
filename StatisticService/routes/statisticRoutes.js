import express from "express";
import { getStatisticByMonthController} from "../controller/statisticController.js";

const router = express.Router();

router.post("/statistic/getStatisticByMonth", getStatisticByMonthController);


export default { routes: router };
