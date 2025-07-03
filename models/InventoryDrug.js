const mongoose = require('mongoose');

const InventoryDrugSchema = new mongoose.Schema({
    clinicRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClinicRoom", required: true},
    drug: { type: mongoose.Schema.Types.ObjectId, ref: "Drug", required: true},
    quantity: { type: Number, required: true},
    expirationDate: { type: Date, required: true}
})

module.exports = mongoose.model('InventoryDrug', InventoryDrugSchema);