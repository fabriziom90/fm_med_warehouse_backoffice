const csv = require('csv-parser');
const { Readable } = require('stream');

const { validationResult } = require('express-validator');

const Product = require('../models/Product');
const ClinicRoom = require('../models/ClinicRoom');
const InventoryProduct = require('../models/InventoryProduct');

const index = async (req, res) => {
    const products = await Product.find();
    res.json({products: products});
}

const get = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json({product: product})
}

const store = async (req, res) => {
    try{
        const validations = validationResult(req);

        if(!validations.isEmpty()){
            return res.status(200).json({ result: false, message:validations.errors[0].msg})
        }

        const { name } = req.body;

        const newProduct = new Product({name});
        await newProduct.save();

        res.status(201).json({
            result: true,
            message: "Prodotto inserito con successo"
        })
    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Inserimento del prodotto non completato. Contattare l'amministratore del sistema. "+err
        })
    }
}

const update = async (req, res) => {
    try{
        const validation = validationResult(req);

        if(!validation.isEmpty()){
            return res.status(200).json({result: false, message: validation.errors[0].msg})
        }

        const productId = req.params.id;
        const {name} = req.body;
        
        const updated = await Product.findByIdAndUpdate(productId, { name });

        if(!updated){
            res.status(404).json({ message: 'Prodotto non trovato'})
        }

        res.status(200).json({
            result: true,
            message: "Prodotto modificato correttamente."
        });

    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Modifica del prodotto non completata. Contattare l'amministratore del sistema. "+err
        })
    }
}

const destroy = async (req, res) => {
    const productId = req.params.id;

    const deleted = await Product.findByIdAndDelete(productId);

    if(!deleted){
        return res.status(404).json({ result: false, message: "Prodotto non trovato"})
    }

    await InventoryProduct.deleteMany({ product: productId})

    res.status(200).json({
        result: true,
        message: "Prodotto cancellato correttamente"
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
                // find product and clinic room
                let product = await Product.findOne({ name: row.nome });
                
                // product is not found: create a new one and use it
                if(!product){
                    product = await Product.create({ name: row.nome});
                }

                const clinicRoom = await ClinicRoom.findById(roomId);

                // room is not found, ignore record
                if (!clinicRoom) {
                   
                    errors.push(`Record ignorato: prodotto o stanza non trovati (${row.productName}, ${row.clinicRoomName})`);
                    continue;
                }
                
                let date
                if(row.scadenza !== ''){
                    let dateArray = row.scadenza.split('/');
                    
                    date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
                }

                // check if product has expirationDate. If not, give it a default value
                date = row.scadenza === '' ? new Date() : new Date(date);
                
                // push object in array toInsert for saving later
                toInsert.push({
                    product: product._id,
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
                
               await InventoryProduct.findOneAndUpdate(
                   {
                       clinicRoom: item.clinicRoom,
                       product: item.product
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