const { validationResult } = require("express-validator");
const Doctor = require("../models/Doctor");
const { encrypt, decrypt } = require('../config/crypto');

// index
const index = async (req, res) => {
    const doctors = await Doctor.find();

    const decryptedDoctors = doctors.map( doctor => ({
        ...doctor.toObject(),
        name: decrypt(doctor.name),
        surname: decrypt(doctor.surname)
    }))

    res.status(200).json({doctors: decryptedDoctors})
}

// get
const show = async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id)

    const decryptedDoctor = {
        ...doctor.toObject(),
        name: decrypt(doctor.name),
        surname: decrypt(doctor.surname)
    }
    

    res.status(200).json({ doctor: decryptedDoctor})
}

// store
const store = async (req, res) => {
    
    try{
        const validations = validationResult(req);

        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message: validations.errors[0].msg})
        }

        let { name, surname, specialty } = req.body;

        name = encrypt(name);
        surname = encrypt(surname);

        const newDoctor = new Doctor({ name, surname, specialty})
        
        await newDoctor.save();

        res.status(201).json({
            result: true,
            message: "Dottore inserito con successo",
            doctor: newDoctor
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Errore durante l'inserimento. Contattare l\'amministratore: "+err
        })
    }
}

// update
const update = async (req, res) => {
    try{
        const validations = validationResult(req);
        if(!validations.isEmpty()){
            return res.status(200).json({ result: false, message: validations.errors[0].msg})
        }
        
    
        const { id } = req.params;
        let { name, surname, specialty } = req.body;
        
        name= encrypt(name);
        surname = encrypt(surname);

        const doctor = await Doctor.findByIdAndUpdate(id, { name, surname, specialty});
        
        if(!doctor){
            return res.status(404).json({ result: false, message: "Dottore non trovato"});
        }
    
        res.status(200).json({
            result: true,
            message: "Dottore modificato con successo"
        });

    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Errore durante l'inserimento. Contattare l\'amministratore: "+err
        })
    }
}

// destroy
const destroy = async (req, res) => {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if(!doctor){
        return res.status(404).json({ result: false, message: "Dottore non trovato"})
    }

    res.status(200).json({
        result: true,
        message: "Dottore cancellato correttamente"
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}