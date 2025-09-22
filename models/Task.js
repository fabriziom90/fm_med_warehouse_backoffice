const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    text: { type: String, required: true},
    date: { type: Date, required: true},
    hour: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Controlla formato HH:mm
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} non è un orario valido (HH:mm)!`
        }
    },
    done: { type: Boolean, required: true}
})

module.exports = mongoose.model('Task', TaskSchema)