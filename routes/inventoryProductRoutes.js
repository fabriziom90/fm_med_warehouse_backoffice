const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');
const InventoryProductController = require('../controllers/InventoryProductController');

const router = express.Router();

router.get('/:id', authMiddleware, InventoryProductController.index);
router.patch('/:id/edit_quantity', authMiddleware, InventoryProductController.editQuantity);
router.patch('/:id/edit_expiration_date', authMiddleware, InventoryProductController.editExpirationDate);
router.post('/create', [
    check('product').notEmpty().withMessage('Devi selezionare prima il prodotto'),
    check('quantity').notEmpty().trim().withMessage('Devi inserire la quantità').isNumeric().withMessage('Devi inserire un valore numerico'),
    check('expirationDate').notEmpty().trim().withMessage('Devi inserire la data di scadenza').isISO8601().withMessage('La scadenza deve essere una data valida')
], authMiddleware, InventoryProductController.createInventoryProduct);
router.delete('/delete/:id', authMiddleware, InventoryProductController.deleteInventoryProduct);
module.exports = router;