const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const InventoryDrugController = require('../controllers/InventoryDrugController');

const router = express.Router();

router.get('/:id', authMiddleware, InventoryDrugController.index);
router.patch('/:id/edit_quantity', authMiddleware, InventoryDrugController.editQuantity);
router.patch('/:id/edit_expiration_date', authMiddleware, InventoryDrugController.editExpirationDate);

module.exports = router;