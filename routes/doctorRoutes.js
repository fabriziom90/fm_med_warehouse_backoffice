const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const DoctorController = require('../controllers/DoctorController');

const router = express.Router();

router.get('/', authMiddleware, DoctorController.index);
router.get('/:id', authMiddleware, DoctorController.show);
router.post('/', authMiddleware, [
    check('name').notEmpty().trim().withMessage("Devi inserire il nome del medico"),
    check('surname').notEmpty().trim().withMessage("Devi inserire il cognome del medico"),
    check('specialty').notEmpty().trim().withMessage("Devi inserire la specializzazione del medico")
], DoctorController.store);
router.put('/:id', authMiddleware, [
    check('name').notEmpty().trim().withMessage("Devi inserire il nome del medico"),
    check('surname').notEmpty().trim().withMessage("Devi inserire il cognome del medico"),
    check('specialty').notEmpty().trim().withMessage("Devi inserire la specializzazione del medico")
], DoctorController.update);
router.delete('/delete/:id', authMiddleware, DoctorController.destroy);

module.exports = router;
