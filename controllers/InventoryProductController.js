const InventoryProduct = require('../models/InventoryProduct.js');

const index = async (req, res) => {
    const inventoryProducts = await InventoryProduct.find({clinicRoom: req.params.id}).populate('product', 'name').exec();
    res.json({inventoryProducts: inventoryProducts});
}

const editQuantity = async (req, res) => {
    const inventoryId = req.params.id;
    const quantity = req.body.quantity;
    const inventoryProduct = await InventoryProduct.findByIdAndUpdate(inventoryId, {quantity: quantity})

    if(!inventoryProduct){
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
    const inventoryProduct = await InventoryProduct.findByIdAndUpdate(inventoryId, {expirationDate: date});

    if(!inventoryProduct){
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