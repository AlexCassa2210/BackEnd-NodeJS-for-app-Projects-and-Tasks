const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './variables.env' });

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        });
        console.log("BD Conectada");
    } catch (error) {
        console.log(error);
        process.exit(1); // detener la app
    }
};

module.exports = conectarBD;