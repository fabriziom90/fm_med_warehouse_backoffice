const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const InventoryDrugController = require('../controllers/InventoryDrugController');

const router = express.Router();

router.get('/:id', authMiddleware, InventoryDrugController.index);

module.exports = router;