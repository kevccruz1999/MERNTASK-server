const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const conectarDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });

        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); // En caso de haber problema en la app se detiene la app
    }
}

module.exports = conectarDB;