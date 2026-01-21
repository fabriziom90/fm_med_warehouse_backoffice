const mongoose = require('mongoose');

const DrugSchema = mongoose.Schema({
    name: { type: String, required: true}
})

module.exports = mongoose.model('Drug', DrugSchema);