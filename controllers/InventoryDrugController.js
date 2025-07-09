const InventoryDrug = require('../models/InventoryDrug.js');

const index = async (req, res) => {
    const inventoryDrugs = await InventoryDrug.find({clinicRoom: req.params.id}).populate('drug', 'name').exec();
    
    res.json({inventoryDrugs: inventoryDrugs});
}

module.exports = {
    index
}