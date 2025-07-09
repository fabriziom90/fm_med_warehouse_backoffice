const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const DrugController = require('../controllers/DrugController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, DrugController.index);
router.get('/:id/get', authMiddleware, DrugController.get);
router.post('/store', authMiddleware, [ check('name').notEmpty().trim().withMessage("Devi inserire il nome del medicinale")], DrugController.store);
router.patch('/:id/update', authMiddleware, [ check('name').notEmpty().trim().withMessage("Devi inserire il nome del medicinale")], DrugController.update);
router.delete('/delete/:id', authMiddleware, DrugController.destroy);
router.post('/:id/upload', authMiddleware, upload.single('file'), DrugController.upload);

module.exports = router;