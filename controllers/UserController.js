const {validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try{
        // validations of fields
        const validations = validationResult(req);
        // if result of validation is not empty return an error message for the field
        if(!validations.isEmpty()){
            return res.status(200).json({result: false, message:validations.errors[0].msg})
        }

        // get the form fields
        const { username, password } = req.body;

        // find the user
        const user = await User.findOne({username});
        if(!user) return res.status(401).json({result: false, message: "Utente non trovato"})
        
        // check the password sended by the user with the password saved in the schema
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return res.status(401).json({result:false, message: "La password inserita è sbagliata"});

        // create JWT
        const token = jwt.sign(
            {userId: user.id, role: user.role, username: user.username},
            process.env.SECRET_JWT,
            {expiresIn: "8h"}
        )

        res.json({token});

    }
    catch(err){
        res.status(500).json({
            result: false,
            message: "Qualcosa è andato storto. Riprova più tardi o contatta lo sviluppatore indicandogli l'errore seguente: "+err.message
        })
    }

}

module.exports = {
    login
}