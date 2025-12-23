const {validationResult} = require('express-validator');
const TimeEntry = require('../models/TimeEntry');

const index = async (req, res) => {
    const entries = await TimeEntry();

    res.status(200).json({ entries: entries });
}

const store = async (req, res) => {
    try {
        const validations = validationResult(req);

        if (!validations.isEmpty()) {
            return res.status(200).json({ result: false, message: validations.errors[0].msg })
        }

        const { date, start, end, note } = req.body;
    
        const startTime = new Date(`${date}T${start}:00Z`);
        const endTime = new Date(`${date}T${end}:00Z`);
    
        if (endTime <= startTime) {
            return res.status(400).json({
                message: "L'ora di fine deve essere successiva a quella di inizio"
            })
        }
    
        const durationMinutes = Math.round((endTime - startTime) / 60000);
    
        const newEntry = new TimeEntry({
            userId: req.user._id,
            date: new Date(date),
            startTime,
            endTime,
            durationMinutes,
            note
        })
    
        await newEntry.save();

        return res.status(200).json({
            result: true,
            message: "Tempo di lavoro inserito correttamente"
        })
    }
    catch (err) {
        res.status(500).json({
            result: false,
            message: "Errore durante la fase di inserimento. Contattare l'amministratore"
        })
    }

}

const update = async (req, res) => {
    try {
        const validations = validationResult(req);
        
        if (!validations.isEmpty()) {
            return res.status(200).json({ result: false, message: validations.errors[0].msg })
        }

        const { date, start, end, note } = req.body;

        const startTime = new Date(`${date}T${start}:00Z`);
        const endTime = new Date(`${date}T${end}:00Z`);

        if (endTime <= startTime) {
            return res.status(400).json({
                message: "L'ora di fine deve essere successiva a quella di inizio"
            })
        }

        const durationMinutes = Math.round((endTime - startTime) / 60000);

        const updated = await TimeEntry.findByIdAndUpdate(req.params.id, {
            date: new Date(date),
            startTime,
            endTime,
            durationMinutes,
            note
        });

        if (!updated) {
            return res.status(200).json({
                result: false,
                message: "Tempo di lavoro non trovato"
            })
        }

        res.status(200).json({
            result: true,
            message: "Tempo di lavoro modificato correttamente"
        });
    }
    catch (err) {
        res.status(500).json({
            result: false,
            message: "Errore durante la fase di modifica. Contattare l'amministratore: "+err
        })
    }
}

const destroy = async (req, res) => {
    try {
        const deleted = await TimeEntry.findByIdAndDelete(req.params.id);
        
        if (!deleted) {
            return res.status(200).json({
                result: false,
                message: "Tempo di lavoro non trovato"
            })
        }

        res.status(200).json({
            result: true,
            message: "Tempo di lavoro cancellato correttamente"
        });
    }
    catch (err) {
        res.status(500).json({
            result: false,
            message: "Cancellazione non avvenuta. Contattare l'amministratore: "+err
        })
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}