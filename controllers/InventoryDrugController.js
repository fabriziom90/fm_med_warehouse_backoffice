const { validationResult } = require('express-validator');
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
        return res.status(404).json({ message: "Medicinale non trovato nell'inventario"})
    }

    res.status(200).json({
        result: true,
        message: "Quantità del medicinale nella stanza aggiornata."
    })
}

const editExpirationDate = async (req, res) => {
    const inventoryId = req.params.id;
    const expirationDate = req.body.expirationDate;
    const date = new Date(expirationDate)
    const inventoryDrug = await InventoryDrug.findByIdAndUpdate(inventoryId, {expirationDate: date});

    if(!inventoryDrug){
        return res.status(404).json({ message: "Medicinale non trovato nell'inventario"});
    }

    res.status(200).json({
        result: true,
        message: "Data di scadenza del medicinale nella stanza aggiornata"
    })
}

const createInventoryDrug = async (req, res) => {
    try{
        const validation = validationResult(req)
        
        if(!validation.isEmpty()){
            return res.status(500).json({ result: true, message: validation.errors[0].msg});
        }

        const { drug, roomId, quantity, expirationDate } = req.body;

        const newInventoryDrug = new InventoryDrug({drug, clinicRoom: roomId, quantity, expirationDate });
        await newInventoryDrug.save();

        res.status(200).json({
            result: true,
            message: "Nuovo inserimento di medicinale completato correttamente"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante l\'inserimento. Contattare l\'amministratore del sistema. '+err
        });
    }
    
}

const deleteInventoryDrug = async (req, res) => {
    const drugId = req.params.id;

    const deleted = await InventoryDrug.findByIdAndDelete(drugId);

    if(!deleted){
        return res.status(404).json({ message: 'Medicinale dell\'inventario non trovato'});
    }

    res.status(200).json({
        result: true,
        message: 'Medicinale dell\'inventario cancellato correttamente'
    })
}

module.exports = {
    index,
    editQuantity,
    editExpirationDate,
    createInventoryDrug,
    deleteInventoryDrug
}