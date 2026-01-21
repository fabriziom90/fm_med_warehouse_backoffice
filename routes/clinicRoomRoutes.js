const express = require('express');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ClinicRoomController = require('../controllers/ClinicRoomController');

const router = express.Router();

router.get('/', authMiddleware, ClinicRoomController.index);
router.get('/:id/get', authMiddleware, ClinicRoomController.get);
router.post('/store', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome della stanza')
], ClinicRoomController.store);
router.patch('/:id', authMiddleware, [check('name').notEmpty().trim().withMessage('Devi inserire il nome della stanza')], ClinicRoomController.update);
router.delete('/delete/:id', authMiddleware, ClinicRoomController.destroy);

module.exports = router;