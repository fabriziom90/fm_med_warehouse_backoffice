const { validationResult } = require('express-validator');
const Product = require('../models/Product');

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
        res.status(404).json({ result: false, message: "Prodotto non trovato"})
    }

    res.status(200).json({
        result: true,
        message: "Prodotto cancellato correttamente"
    })
} 

module.exports = {
    index,
    get,
    store,
    update,
    destroy
}