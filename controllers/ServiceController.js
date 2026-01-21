const { validationResult } = require('express-validator');
const Service = require('../models/Service');

const { encrypt, decrypt } = require('../config/crypto');

const index = async (req, res) => {
    const services = await Service.find();

    

    res.json({ services: services});
} 

const get = async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    
    res.status(200).json({ service: service})
}

const store = async (req, res) => {
    try{
        const validations = validationResult(req);
        
        if(!validations.isEmpty()){
            return res.status(200).json({ result: false, message: validations.errors[0].msg})
        }
    
        const { name } = req.body;

        const newService = new Service({name});
    
        await newService.save();
    
        res.status(200).json({
            result: true,
            message: "Prestazione inserita con successo",
            patient: newService
        });
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Inserimento della prestazione non completata. Contattare l'amministratore del sistema. "+err
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
        const { name } = req.body;
    
        const service = await Service.findByIdAndUpdate(id, { name });
    
        if(!service){
            return res.status(200).json({ result: false, message: "Prestazione non trovata"})
        }
    
        res.status(200).json({
            result: true,
            message: "Prestazione modificata con successo"
        })
    }
    catch(err){
        return res.status(500).json({
            result: false,
            message: "Modifica della prestazione non completata. Contattare l'amministratore del sistema. "+err
        });
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);
    
    if(!deleted){
        return res.status(200).json({ result: false, message: "Prestazione non trovato"});
    }

    res.status(200).json({
        result: true,
        message: "Prestazione cancellata correttamente"
    })
}

module.exports = {
    index,
    get,
    store,
    update,
    destroy
}