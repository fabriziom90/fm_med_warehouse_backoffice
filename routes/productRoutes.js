const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', authMiddleware, ProductController.index);

module.exports = router;