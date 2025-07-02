const express = require('express');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ClinicRoomController = require('../controllers/ClinicRoomController');

const router = express.Router();

router.get('/', authMiddleware, ClinicRoomController.index);
router.get('/:id', authMiddleware, ClinicRoomController.show);
router.post('/store', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome della stanza')
], ClinicRoomController.store);
router.patch('/:id/update', authMiddleware, ClinicRoomController.update);

module.exports = router;