const mongoose = require('mongoose');

// schema definition
const ClinicRoomSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('ClinicRoom', ClinicRoomSchema)