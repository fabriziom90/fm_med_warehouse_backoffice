const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');

const index = (req, res) => {
    const patients = Patient.find();
    res.json({ patients: patients});
} 