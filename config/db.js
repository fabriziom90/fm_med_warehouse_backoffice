const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('Connessione a MongoDb stabilita')
    }
    catch(err){
        console.log(`Connessione fallita: `+err);
       
    }
}

module.exports = connectDB