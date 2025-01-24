const express = require('express');
const { xuatLoiChaoTenTuoi } = require('../controller/loichaoController');

const router = express.Router();

router.post("/loichao", xuatLoiChaoTenTuoi);


module.exports = {routes: router};
