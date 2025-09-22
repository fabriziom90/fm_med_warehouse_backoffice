const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// index
const index = async (req, res) => {
    const tasks = await Task.find();
    res.json({ tasks: tasks})
}

// get
const get = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById();
    res.json({ task: task});
}

// store
const store = async (req, res) => {
    try{
        const validations = validationResult(req);
        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }

        const { text, date, done } = req.body

        const newTask = new Task({text, date, done});

        await newTask.save();

        res.status(201).json({
            result: true,
            message: "Task creato con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante la fase di inserimento. Contattare l\'amministratore '+err
        })
    }
}

// update
const update = async (req, res) => {
    try{
        const validations = validationResult(req);

        if(!validations.isEmpty()){
            res.status(200).json({ result: false, message: validations.errors[0].msg})
        }

        const { id } = req.params;
        const { text, date, done } = req.body;

        const updated = await Task.findByIdAndUpdate(id, { text, date, done});

        if(!updated){
            res.status(404).json({ result: false, message: "Task non trovato"});
        }

        res.status(200).json({
            result: true,
            message: "Task modificato con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: 'Errore durante la fase di modifica. Contattare l\'amministratore '+err
        })
    }
} 

// destroy
const destroy = async (req, res) => {
    const { id } = req.params;

    const deleted = Task.findByIdAndDelete(id);

    if(!deleted){
        res.status(404).json({ result: false, message: "Task non trovato"});
    }

    res.status(200).json({
        result: true,
        message: "Task cancellato con successo"
    })
}

module.exports = {
    index,
    get, 
    store,
    update,
    destroy
}
