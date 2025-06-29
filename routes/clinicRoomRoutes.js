const express = require('express');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ClinicRoomController = require('../controllers/ClinicRoomController');

const router = express.Router();

router.get('/', authMiddleware, ClinicRoomController.index);

module.exports = router;