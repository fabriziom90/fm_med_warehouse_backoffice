const mongoose = require('mongoose');

// schema definition
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
});

module.exports = mongoose.model('Product', ProductSchema);