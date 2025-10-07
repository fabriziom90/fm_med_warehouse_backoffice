const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, ProductController.index);
router.get('/:id/get', authMiddleware, ProductController.get);
router.post('/store', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome del prodotto.')
], ProductController.store);
router.patch('/:id', authMiddleware, [
    check('name').notEmpty().trim().withMessage('Devi inserire il nome del prodotto.')
], ProductController.update);
router.delete('/delete/:id', authMiddleware, ProductController.destroy);
router.post('/:id/upload', authMiddleware, upload.single('file'), ProductController.upload);

module.exports = router;