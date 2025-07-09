const InventoryProduct = require('../models/InventoryProduct.js');

const index = async (req, res) => {
    const inventoryProducts = await InventoryProduct.find({clinicRoom: req.params.id}).populate('product', 'name').exec();
    res.json({inventoryProducts: inventoryProducts});
}

module.exports = {
    index
}