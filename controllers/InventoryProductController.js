const { validationResult } = require('express-validator');
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

const createInventoryProduct = async (req, res) => {
    try{
        const validations = validationResult(req)
        
        if(!validations.isEmpty()){
            return res.status(200).json({ result: true, message: validation.errors[0].msg});
        }

        const { product, roomId, quantity, expirationDate } = req.body;

        const newInventoryProduct = new InventoryProduct({product, clinicRoom: roomId, quantity, expirationDate });
        await newInventoryProduct.save();

        res.status(200).json({
            result: true,
            message: "Nuovo inserimento di prodotto completato correttamente"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante l\'inserimento. Contattare l\'amministratore del sistema. '+err
        });
    }
    
}

const deleteInventoryProduct = async (req, res) => {
    const productId = req.params.id;

    const deleted = await InventoryProduct.findByIdAndDelete(productId);

    if(!deleted){
        return res.status(404).json({ message: 'Prodotto dell\'inventario non trovato'});
    }

    res.status(200).json({
        result: true,
        message: 'Prodotto dell\'inventario cancellato correttamente'
    })
}

module.exports = {
    index,
    editQuantity,
    editExpirationDate,
    createInventoryProduct,
    deleteInventoryProduct
}