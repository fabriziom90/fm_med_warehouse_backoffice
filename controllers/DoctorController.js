const { validationResult } = require("express-validator");
const Doctor = require("../models/Doctor");

// index
const index = async (req, res) => {
    const doctors = await Doctor.findAll();
    res.status(200).json({doctors: doctors})
}

// get
const show = async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id)

    res.status(200).json({ doctor: doctor})
}

// store
const store = async (req, res) => {
    try{
        const validations = validationResult();

        if(!validations.isEmpty()){
            res.status(200).json({result: false, message: validations.errors[0].msg})
        }

        const { name, surname, specialty } = req.body;

        const newDoctor = new Doctor({ name, surname, specialty})
        
        await newDoctor.save();

        res.status(201).json({
            result: true,
            message: "Dottore inserito con successo"
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
const update = (req, res) => {
    const validations = validationResult();
    if(!validations.isEmpty()){
        res.status(200).json({ result: false, message: validations.errors[0].msg})
    }

    const { id } = req.params;
    const { name, surname, specialty } = req.body;

    const doctor = Doctor.findByIdAndUpdate(id, { name, surname, specialty});

    if(!doctor){
        res.status(404).json({ result: false, message: "Dottore non trovato"});
    }

    res.status(200).json({
        result: true,
        message: "Dottore modificato con successo"
    });
}

// destroy
const destroy = (req, res) => {
    const { id } = req.params;

    const doctor = Doctor.findByIdAndDelete(id);

    if(!doctor){
        res.status(404).json({ result: false, message: "Dottore non trovato"})
    }

    res.status(200).json({
        result: true,
        message: "Dottore trovato correttamente"
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}