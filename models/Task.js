const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    text: { type: String, required: true},
    start: { type: Date, required: true},
    end: { type: Date, required: true},
    done: { type: Boolean, required: true}
})

module.exports = mongoose.model('Task', TaskSchema)