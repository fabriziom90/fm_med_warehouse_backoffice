const InventoryProduct = require('../models/InventoryProduct.js');
const InventoryDrugs = require('../models/InventoryDrug.js');

const index = async (req, res) => {

    try{

        const roomId = req.params.id;
        
        const today = new Date();
        const in15Days  = new Date();
        in15Days.setDate(today.getDate() + 15);
    
        const inventoryProductsQuantity = await InventoryProduct.find({
            clinicRoom: roomId,
            $and: [
                {quantity: { $lte: 1}},
            ]
            
        }).populate('product', 'name').exec()
        
        const inventoryProductsExpiration = await InventoryProduct.find({
            clinicRoom: roomId,
            $and: [
                {expirationDate: { $lte: in15Days }}
            ]
            
        }).populate('product', 'name').exec()

        const inventoryDrugsQuantity = await InventoryDrugs.find({
            clinicRoom: roomId,
            $and: [
                {quantity: { $lte: 1}},
                // {expirationDate: { $lte: in15Days }}
            ]
        }).populate('drug', 'name').exec()

        const inventoryDrugsExpiration = await InventoryDrugs.find({
            clinicRoom: roomId,
            $and: [
                {expirationDate: { $lte: in15Days }}
            ]
        }).populate('drug', 'name').exec()
    
        res.status(200).json({
            result: true,
            inventoryProductsQuantity,
            inventoryProductsExpiration,
            inventoryDrugsQuantity,
            inventoryDrugsExpiration
        })
    }
    catch(err){
        res.status(500).json({ result: false, message: 'Errore nel recupero dei dati dal database: '+err})
    }


}

module.exports = {
    index
}