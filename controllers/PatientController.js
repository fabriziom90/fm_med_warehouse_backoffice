const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');

const index = async (req, res) => {
    const patients = await Patient.find();
    res.json({ patients: patients});
} 

const get = async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    
    res.status(200).json({ patient: patient})
}

const store = async (req, res) => {
    try{
        const validations = validationResult(req);
        
        if(!validations.isEmpty()){
            return res.status(200).json({ result: false, message: validations.errors[0].msg})
        }
    
        const { name, surname } = req.body;
    
        const newPatient = new Patient({name, surname});
    
        await newPatient.save();
    
        res.status(200).json({
            result: true,
            message: "Paziente inserito con successo",
            patient: newPatient
        });
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Inserimento del paziente non completata. Contattare l'amministratore del sistema. "+err
        })
    }
}

const update = async (req, res) => {
    try{

        const validations = validationResult(req);
    
        if(!validations.isEmpty()){
            return res.status(200).json({ result: false, message: validations.errors[0].msg});
        }
    
        const { id } = req.params;
        const { name, surname } = req.body;
    
        const patient = await Patient.findByIdAndUpdate(id, { name, surname });
    
        if(!patient){
            return res.status(200).json({ result: false, message: "Paziente non trovato"})
        }
    
        res.status(200).json({
            result: true,
            message: "Paziente modificato con successo"
        })
    }
    catch(err){
        return res.status(500).json({
            result: false,
            message: "Modifica del paziente non completata. Contattare l'amministratore del sistema. "+err
        });
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;

    const deleted = await Patient.findByIdAndDelete(id);
    
    if(!deleted){
        return res.status(200).json({ result: false, message: "Paziente non trovato"});
    }

    res.status(200).json({
        result: true,
        message: "Paziente cancellato correttamente"
    })
}

module.exports = {
    index,
    get,
    store,
    update,
    destroy
}