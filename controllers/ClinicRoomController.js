const {validationResult} = require('express-validator');
const ClinicRoom = require('../models/ClinicRoom');

const index = async (req, res) => {
    const clinicRooms = await ClinicRoom.find();
    res.json(clinicRooms);

    
}

module.exports = {
    index
}