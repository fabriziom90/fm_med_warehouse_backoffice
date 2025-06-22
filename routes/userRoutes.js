const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/login', [
    check('username').notEmpty().trim().withMessage('Devi inserire la username'),
    check('password').notEmpty().trim().withMessage('Devi inserire la password')
], UserController.login);

module.exports = router;