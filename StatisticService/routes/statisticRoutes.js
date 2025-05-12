import express from "express";
import { getStatisticByMonthController, getStatisticByYearController} from "../controller/statisticController.js";

const router = express.Router();

router.post("/statistic/getStatisticByMonth", getStatisticByMonthController);
router.post("/statistic/getStatisticByYear", getStatisticByYearController);


export default { routes: router };
