const { validationResult } = require('express-validator');
const Product = require('../models/Product');

const index = async () => {
    const products = await Product.find();
    res.json({products: products});
}