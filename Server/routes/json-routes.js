const express = require('express');
const { createJson } = require('../controller/jsonController');

const router = express.Router();

router.get("/createJson", createJson);


module.exports = {routes: router};