const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const PatientController = require('../controllers/PatientController');

const router = express.Router();

router.get('/', authMiddleware, PatientController.index);
router.get('/:id', authMiddleware, PatientController.get);
router.post('/', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome del paziente'),
    check('surname').notEmpty().trim().withMessage('Devi inserire il cognome del paziente')
], PatientController.store);
router.put('/:id', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome del paziente'),
    check('surname').notEmpty().trim().withMessage('Devi inserire il cognome del paziente')
], PatientController.update);
router.delete('/delete/:id', authMiddleware, PatientController.destroy);

module.exports = router;

