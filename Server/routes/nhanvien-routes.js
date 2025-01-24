const express = require('express');
const { getNhanVien, traCuuNhanVien } = require('../controller/nhanvienController');

const router = express.Router();

router.get("/nhanvien", getNhanVien);
router.post("/nhanvien", traCuuNhanVien);



module.exports = {routes: router};