const csv = require('csv-parser');
const { Readable } = require('stream');

const { validationResult } = require('express-validator');
const Drug = require('../models/Drug');
const ClinicRoom = require('../models/ClinicRoom');
const InventoryDrug = require('../models/InventoryDrug');

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

    await InventoryDrug.deleteMany({ drug: drugId})

    res.status(200).json({
        result: true,
        message: "Il medicinale è stato cancellato correttamente"
    })
}

const upload = async (req, res) => {
    // check if the file is uploaded
    
    if(!req.file){
        res.status(200).json({message: "Nessun file caricato"});
    }

    const roomId = req.params.id;
    
    // define array variables for results and errors
    const results = [];
    const errors = [];
    
    // define stream from uploaded file to read it. Not saving file on server, don't need that
    const stream = Readable.from(req.file.buffer);

    // parsing file row by row
    stream
    .pipe(csv()) //read file
    .on('data', (data) => {
        results.push(data); //push data in results array
    })
    .on('end', async () => {
        const toInsert = [];
       
        // read results array
        for (const row of results) {
            
            try {
                // find drugs and clinic room
                let drug = await Drug.findOne({ name: row.nome });
                
                // drug is not found: create a new one and use it
                if(!drug){
                    drug = await Drug.create({ name: row.nome});
                }

                const clinicRoom = await ClinicRoom.findById(roomId);

                // room is not found, ignore record
                if (!clinicRoom) {
                   
                    errors.push(`Record ignorato: prodotto o stanza non trovati (${row.drugName}, ${row.clinicRoomName})`);
                    continue;
                }
                
                let date
                if(row.scadenza !== ''){
                    let dateArray = row.scadenza.split('/');
                    
                    date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
                }

                // check if drug has expirationDate. If not, give it a default value
                date = row.scadenza === '' ? new Date() : new Date(date);
                
                // push object in array toInsert for saving later
                toInsert.push({
                    drug: drug._id,
                    clinicRoom: clinicRoom._id,
                    quantity: parseInt(row.quantita),
                    expirationDate: new Date(date),
                });
                
            } catch (err) {
                errors.push(`Errore su riga: ${JSON.stringify(row)} - ${err.message}`);
            }
        }

        try {
            
           for(let i=0; i<toInsert.length; i++){
                let item = toInsert[i];
                
               await InventoryDrug.findOneAndUpdate(
                   {
                       clinicRoom: item.clinicRoom,
                       drug: item.drug
                   },
                   {
                       $set:{
                           expirationDate: item.expirationDate,
                           quantity: item.quantity
                       }
                   },
                   { upsert: true, new: true}
               )
           }
                

            // save all the records at once with insertMany
            
            res.status(200).json({
                result: true,
                message: `Importazione completata. ${toInsert.length} record inseriti.`,
                errors,
            });
        } catch (err) {
            res.status(500).json({ message: 'Errore durante il salvataggio', error: err.message });
        }
    })
    .on('error', (err) => {
        res.status(500).json({ message: 'Errore nella lettura del CSV', error: err.message });
    });
}

module.exports = {
    index,
    get,
    store,
    update,
    destroy,
    upload
}