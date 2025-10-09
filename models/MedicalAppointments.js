const mongoose = require('mongoose');

const MedicalAppointmentsSchema = mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true},
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},
    date: { type: Date, required: true},
    invoiceNumber: { type: Number, required: true},
    service: { type: String, required: true},
    total: { type: Number, required: true},
    serviceValue: { type: Number, required: true},
    percentageToDoctor: { type: Number, required: true},
    assignedAmount: { type: Number, required: true},
})

module.exports = mongoose.model('MedicalAppointment', MedicalAppointmentsSchema);