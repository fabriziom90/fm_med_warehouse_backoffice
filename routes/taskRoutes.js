const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/', authMiddleware, TaskController.index);
router.get('/:id', authMiddleware, TaskController.get);
router.post('/', authMiddleware, [
    check('title').notEmpty().trim().withMessage('Devi inserire il titolo del task'),
    check('note').notEmpty().trim().withMessage("Devi inserire il testo del task"),
    check('start').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      }),
    check('end').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      }),
], TaskController.store);
router.put('/:id', authMiddleware,  [
    check('title').notEmpty().trim().withMessage('Devi inserire il titolo del task'),
    check('note').notEmpty().trim().withMessage("Devi inserire il testo del task"),
    check('start').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      }),
    check('end').notEmpty().withMessage("Devi inserire la data").isISO8601().withMessage('La data deve essere valida (YYYY-MM-DD)').toDate().custom((value) => {
        if (value <= new Date()) {
          throw new Error('La data deve essere futura');
        }
        return true;
      })
], TaskController.update);
router.delete('/:id', authMiddleware, TaskController.destroy);
router.patch('/:id/done-task', authMiddleware, TaskController.doneTask);

module.exports = router;