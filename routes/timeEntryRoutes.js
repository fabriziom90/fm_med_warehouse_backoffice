const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const TimeEntryController = require('../controllers/TimeEntryController');
const { check } = require('express-validator');

router.get('/', authMiddleware, TimeEntryController.index);
router.post('/', authMiddleware, [
    check('date').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)'),
    check('start').notEmpty().withMessage("Devi inserire l'orario di inizio").matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('L\'orario di inizio deve essere nel formato HH:mm'),
    check('end').notEmpty().withMessage("Devi inserire l'orario di fine").matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('L\'orario di fine deve essere nel formato HH:mm')
], TimeEntryController.store);
router.put('/:id', authMiddleware, [
    check('date').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate(),
    check('start').notEmpty().withMessage("Devi inserire l'orario di inizio").matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('L\'orario di inizio deve essere nel formato HH:mm'),
    check('end').notEmpty().withMessage("Devi inserire l'orario di fine").matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('L\'orario di fine deve essere nel formato HH:mm')
], TimeEntryController.update);
router.delete('/delete/:id', authMiddleware, TimeEntryController.destroy);

module.exports = router;