const { validationResult } = require('express-validator');
const MedicalAppointment = require('../models/MedicalAppointments');

const index = async (req, res) => {
    const medicalAppointments = await MedicalAppointment.find();
    res.status(200).json({ medicalAppointments: medicalAppointments});
}

const get = async (req, res) => {
    const {id} = req.params;
    const medicalAppointment = await MedicalAppointment.findById(id);

    res.staus(200).json({ medicalAppointment: medicalAppointment});
}

const getByDoctor = async (req, res) => {
    const doctorId = req.params.id;
    
    const medicalAppointments = await MedicalAppointment.find({ doctor: doctorId}).populate('patient', 'name surname').exec();

    res.status(200).json({
        medicalAppointments: medicalAppointments
    })

}

const store = async (req, res) => {
    try{

        const validations = validationResult(req);
    
        if(!validations.isEmpty()){
            return res.status(200).json({
                result: false,
                message: validations.errors[0].msg
            })
        }
    
        const { doctor, patient, date, invoiceNumber, service, total, serviceValue, percentageToDoctor, assignedAmount} = req.body;
    
        const newMedicalAppointment = new MedicalAppointment({ doctor, patient, date, invoiceNumber, service, total, serviceValue, percentageToDoctor, assignedAmount});
    
        await newMedicalAppointment.save();
    
        res.status(200).json({
            result: true,
            message: "Appuntamento medico inserito con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Inserimento dell'appuntamento non completato. Contattare l'amministratore del sistema. "+err
        })
    }
    
}

const update = async (req, res) => {
    try{

        const validations = validationResult(req);
    
        if(!validations.isEmpty()){
            return res.status(200).json({
                result: false,
                message: validations.errors[0].msg
            })
        }
    
        const {id} = req.params;
        const { doctor, patient, data, invoiceNumber, service, total, serviceValue, percentageToDoctor, assignedAmount} = req.body;
    
        const medicalAppointment = await MedicalAppointment.findByIdAndUpdate(id, { doctor, patient, data, invoiceNumber, service, total, serviceValue, percentageToDoctor, assignedAmount});
    
        if(!medicalAppointment){
            return res.status(200).json({
                result: false,
                message: "Appuntamento medico non trovato"
            })
        }
    
        res.status(200).json({
            result: true,
            message: "Appuntamento medico inserito con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Modifica dell'appuntamento non completata. Contattare l'amministratore del sistema. "+err
        })
    }
    
}

const destroy = async (req, res) => {
    const { id } = req.params;

    const deleted = MedicalAppointment.findByIdAndDelete(id);

    if(!deleted){
        res.status(200).json({
            result: false,
            message: "Appuntamento medico non trovato"
        })
    }

    res.status(200).json({
        result: true,
        message: "Appuntamento cancellato correttamente"
    })
}

module.exports = {
    index,
    get, 
    getByDoctor,
    store,
    update,
    destroy
}