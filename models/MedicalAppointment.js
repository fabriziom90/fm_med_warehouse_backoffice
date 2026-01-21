const mongoose = require('mongoose');

const MedicalAppointmentsSchema = mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true},
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true},
    date: { type: Date, required: true},
    total: { type: Number, required: true},
    serviceValue: { type: Number, required: true},
    percentageToDoctor: { type: Number, required: true},
    assignedAmount: { type: Number, required: true},
})

module.exports = mongoose.model('MedicalAppointment', MedicalAppointmentsSchema);