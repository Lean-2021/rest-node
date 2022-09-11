const mongoose = require("mongoose");

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Conectado a MongoDB 😎');

    } catch (error) {
        throw new Error('Error al conectar a la base de datos', error);
    }

};

module.exports={
    connectionDB
}
