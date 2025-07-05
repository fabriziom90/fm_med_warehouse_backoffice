const { validationResult } = require('express-validator');
const Drug = require('../models/Drug');

const index = async (req, res) => {
    const drugs = await Drug.find();
    res.status(200).json({
       drugs: drugs
    })
}

const get = async (req, res) => {
    const drugId = req.params.id;
    const drug = await Drug.findById(drugId);

    if(!drug){
        res.status(404).json({
            result: false,
            message: "Medicinale non trovato"
        })
    }

    res.status(200).json({
        drug: drug 
    })
}

const store = async (req, res) => {
    const validation = validationResult(req.body);

    if(!validation){
        res.status(200).json({ result: false, message: "Devi inserire il nome del medicinale"})
    }

    const { name } = req.body;

    const newDrug = new Drug({name});
    await newDrug.save();

    res.status(201).json({
        result: true,
        message: "Medicinale inserito correttamente"
    })
}

const update = async (req, res) => {
    const validation = validationResult(req.body);

    if(!validation){
        res.status(404).json({ result: false, message: "Devi inserire il nome del medicinale"})
    }

    const drugId = req.params.id;
    const { name } = req.body;

    const updated = await Drug.findByIdAndUpdate(drugId, {name});

    if(!updated){
        return res.status(404).json({ message: "Il medicinale non è stato trovato"})
    }

    res.status(200).json({
        result: true,
        message: "Medicinale aggiornato correttamente"
    })
}

const destroy = async (req, res) => {
    const drugId = req.params.id;

    const deleted = await Drug.findByIdAndDelete(drugId);

    if(!deleted){
        return res.status(404).json({result: false, message: "Il medicinale non è stato trovato"})
    }

    res.status(200).json({
        result: true,
        message: "Il medicinale è stato cancellato correttamente"
    })
}

module.exports = {
    index,
    get,
    store,
    update,
    destroy
}