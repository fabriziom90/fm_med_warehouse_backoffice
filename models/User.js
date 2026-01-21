const mongoose = require('mongoose');

// schema definition
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'admin'}
})

// export
module.exports = mongoose.model('User', UserSchema);