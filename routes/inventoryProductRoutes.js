const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const InventoryProductController = require('../controllers/InventoryProductController');

const router = express.Router();

router.get('/:id', authMiddleware, InventoryProductController.index);

module.exports = router;