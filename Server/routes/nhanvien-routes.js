const express = require('express');
const { getNhanVien } = require('../controller/nhanvienController');

const router = express.Router();


router.get("/nhanvien", getNhanVien);


module.exports = {routes: router};