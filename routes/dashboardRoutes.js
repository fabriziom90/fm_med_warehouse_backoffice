const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const DashboardController = require('../controllers/DashboardController');

const router = express.Router();

router.get('/:id', authMiddleware, DashboardController.index);

module.exports = router;
