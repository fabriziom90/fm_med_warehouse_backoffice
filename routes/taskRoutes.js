const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/', authMiddleware, TaskController.index);
router.get('/:id', authMiddleware, TaskController.get);
router.post('/', authMiddleware, [
    check('text').notEmpty().trim().withMessage("Devi inserire il testo del task"),
    check('date').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      })
], TaskController.store);
router.patch('/:id', authMiddleware,  [
    check('text').notEmpty().trim().withMessage("Devi inserire il testo del task"),
    check('date').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      }),
    check('hour').notEmpty().withMessage('Devi inserire l’orario').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('L’orario deve essere valido (HH:mm)')
], TaskController.update);
router.delete('/:id', authMiddleware, TaskController.destroy);

module.exports = router;