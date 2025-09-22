const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    text: { type: String, required: true},
    date: { type: Date, required: true},
    done: { type: Boolean, required: true}
})

module.exports = mongoose.model('Task', TaskSchema)