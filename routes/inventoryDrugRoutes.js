const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const InventoryDrugController = require('../controllers/InventoryDrugController');

const router = express.Router();

router.get('/:id', authMiddleware, InventoryDrugController.index);
router.patch('/:id/edit_quantity', authMiddleware, InventoryDrugController.editQuantity);
router.patch('/:id/edit_expiration_date', authMiddleware, InventoryDrugController.editExpirationDate);
router.post('/create', [
    check('drug').notEmpty().withMessage('Devi selezionare prima il medicinale'),
    check('quantity').notEmpty().trim().withMessage('Devi inserire la quantità').isNumeric().withMessage('Devi inserire un valore numerico'),
    check('expirationDate').notEmpty().trim().withMessage('Devi inserire la data di scadenza').isISO8601().withMessage('La scadenza deve essere una data valida')
], authMiddleware, InventoryDrugController.createInventoryDrug);
router.delete('/:id/delete', authMiddleware, InventoryDrugController.deleteInventoryDrug);

module.exports = router;