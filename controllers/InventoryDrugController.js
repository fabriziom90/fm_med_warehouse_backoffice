const InventoryDrug = require('../models/InventoryDrug.js');

const index = async (req, res) => {
    const inventoryDrugs = await InventoryDrug.find({clinicRoom: req.params.id}).populate('drug', 'name').exec();
    
    res.json({inventoryDrugs: inventoryDrugs});
}

const editQuantity = async (req, res) => {
    const inventoryId = req.params.id;
    const quantity = req.body.quantity;
    const inventoryDrug = await InventoryDrug.findByIdAndUpdate(inventoryId, {quantity: quantity})

    if(!inventoryDrug){
        return res.status(404).json({ message: "Prodotto non trovato nell'inventario"})
    }

    res.status(200).json({
        result: true,
        message: "Quantità del prodotto nella stanza aggiornata."
    })
}

const editExpirationDate = async (req, res) => {
    const inventoryId = req.params.id;
    const expirationDate = req.body.expirationDate;
    const date = new Date(expirationDate)
    const inventoryDrug = await InventoryDrug.findByIdAndUpdate(inventoryId, {expirationDate: date});

    if(!inventoryDrug){
        return res.status(404).json({ message: "Prodotto non trovato nell'inventario"});
    }

    res.status(200).json({
        result: true,
        message: "Data di scadenza del prodotto nella stanza aggiornata"
    })
}

module.exports = {
    index,
    editQuantity,
    editExpirationDate
}