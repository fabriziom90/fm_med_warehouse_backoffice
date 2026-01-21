const mongoose = require('mongoose');

const InventoryProductSchema = new mongoose.Schema({
    clinicRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClinicRoom", required: true},
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: { type: Number, required: true},
    expirationDate: { type: Date, required: true}
})

module.exports = mongoose.model('InventoryProduct', InventoryProductSchema);