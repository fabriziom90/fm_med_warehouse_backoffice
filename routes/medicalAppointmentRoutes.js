const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const medicalAppointmentController = require('../controllers/MedicalAppointmentController');

const router = express.Router();

router.get('/', authMiddleware, medicalAppointmentController.index);
router.get('/:id', authMiddleware, medicalAppointmentController.get);
router.post('/', authMiddleware, [
    check('doctor').notEmpty().trim().withMessage('Devi selezionare il medico'),
    check('patient').notEmpty().trim().withMessage('Devi selezionare il paziente'),
    check('data').notEmpty().trim().withMessage('Devi inserire la data della visita').isISO8601().withMessage('La scadenza deve essere una data valida'),
    check('invoiceNumber').notEmpty().trim().withMessage('Devi inserire il numero della fattura').isNumeric('Il valore del numero della fattura deve essere numerico'),
    check('service').notEmpty().trim().withMessage('Devi inserire la prestazione svolta'),
    check('total').notEmpty().trim().withMessage('Devi inserire il totale della fattura').isNumeric().withMessage('Il valore del totale della fattura deve essere numerico'),
    check('serviceValue').notEmpty().trim().withMessage('Devi inserire il valore della prestazione').isNumeric().withMessage('Il valore della prestazione deve essere numerico'),
    check('percentageToDoctor').notEmpty().trim().withMessage('Devi inserire la percentuale del medico').isNumeric().withMessage('Il valore della percentuale del medico deve essere numerico'),
    check('assignedAmount').notEmpty().trim().withMessage('Devi inserire il valore della somma assegnata').isNumeric().withMessage('Il valore della somma assegnata deve essere numerico'),
], medicalAppointmentController.store);
router.put('/:id', authMiddleware, [
    check('doctor').notEmpty().trim().withMessage('Devi selezionare il medico'),
    check('patient').notEmpty().trim().withMessage('Devi selezionare il paziente'),
    check('data').notEmpty().trim().withMessage('Devi inserire la data della visita').isISO8601().withMessage('La scadenza deve essere una data valida'),
    check('invoiceNumber').notEmpty().trim().withMessage('Devi inserire il numero della fattura').isNumeric('Il valore del numero della fattura deve essere numerico'),
    check('service').notEmpty().trim().withMessage('Devi inserire la prestazione svolta'),
    check('total').notEmpty().trim().withMessage('Devi inserire il totale della fattura').isNumeric().withMessage('Il valore del totale della fattura deve essere numerico'),
    check('serviceValue').notEmpty().trim().withMessage('Devi inserire il valore della prestazione').isNumeric().withMessage('Il valore della prestazione deve essere numerico'),
    check('percentageToDoctor').notEmpty().trim().withMessage('Devi inserire la percentuale del medico').isNumeric().withMessage('Il valore della percentuale del medico deve essere numerico'),
    check('assignedAmount').notEmpty().trim().withMessage('Devi inserire il valore della somma assegnata').isNumeric().withMessage('Il valore della somma assegnata deve essere numerico'),
], medicalAppointmentController.update);
router.delete('/:id/delete', authMiddleware, medicalAppointmentController.destroy);

module.exports = router;