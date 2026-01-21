const {validationResult} = require('express-validator');
const ClinicRoom = require('../models/ClinicRoom');

const index = async (req, res) => {
    const clinicRooms = await ClinicRoom.find();
    res.json({clinicRooms: clinicRooms});
}

const get = async (req, res) => {
    const id = req.params.id;
    const clinicRoom = await ClinicRoom.findById(id);
    

    res.json({clinicRoom: clinicRoom});
}

const store = async (req, res) => {
    try{
        const validations = validationResult(req);
        // if result of validation is not empty return an error message for the field
        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }

        const { name } = req.body;
        
        const newRoom = new ClinicRoom({name});
        await newRoom.save();

        res.status(201).json({
            result: true,
            message: "Stanza creata con successo"
        })
    
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante la fase di inserimento. Contattare l\'amministratore. '+err
        })
    }
}

const update = async (req, res) => {
    try{
        
        const validations = validationResult(req);
        // if result of validation is not empty return an error message for the field
        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }
        
        const roomId = req.params.id;
        const { name } = req.body;
        
        
        const updated = await ClinicRoom.findByIdAndUpdate(roomId, { name });

        if(!updated){
            return res.status(404).json({ message: "Stanza non trovata"});
        }
        

        res.status(200).json({
            result: true,
            message: "Stanza modificata con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante la fase di inserimento. Contattare l\'amministratore. '+err
        })
    }
}

const destroy = async (req, res) => {
    try{
        const deleted = await ClinicRoom.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.json({ result: false, message: "Stanza non trovata."})
        }
        
        res.status(200).json({ result: true, message: 'Stanza cancellata con successo'})
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Cancellazione non avvenuta. Contattare l'amministratore. "+err
        })
    }
}

module.exports = {
    index,
    get,
    store,
    update,
    destroy
}