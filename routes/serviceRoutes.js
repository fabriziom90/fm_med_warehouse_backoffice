const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ServiceController = require('../controllers/ServiceController');

const router = express.Router();

router.get('/', authMiddleware, ServiceController.index);
router.get('/:id', authMiddleware, ServiceController.get);
router.post('/', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome della prestazione'),
], ServiceController.store);
router.put('/:id', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome della prestazione'),
], ServiceController.update);
router.delete('/delete/:id', authMiddleware, ServiceController.destroy);

module.exports = router;

