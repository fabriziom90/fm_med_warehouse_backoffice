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
    const task = await Task.findById(id);
    res.json({ task: task});
}

// store
const store = async (req, res) => {
    try{
        const validations = validationResult(req);
        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }

        const { title, note, start, end, done } = req.body
        
        const newTask = new Task({title, start, end, note, done});

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
        const id  = req.params.id;
        const validations = validationResult(req);

        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }

        const { title, note, start, end, done } = req.body
        

        const updated = await Task.findByIdAndUpdate(id, { title, start, end, note, done});

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

    const deleted = await Task.findByIdAndDelete(id);
    
    if(!deleted){
        res.status(404).json({ result: false, message: "Task non trovato"});
    }

    res.status(200).json({
        result: true,
        message: "Task cancellato con successo"
    })
}

// done task - patch
const doneTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if(!task){
        res.status(404).json({
            result: false,
            message: "Task non trovato"
        })
    }

    task.done = !task.done;
    await task.save();

    res.status(200).json({
        result: true,
        message: "Hai modificato lo stato del task correttamente"
    })
}

module.exports = {
    index,
    get, 
    store,
    update,
    destroy,
    doneTask
}
