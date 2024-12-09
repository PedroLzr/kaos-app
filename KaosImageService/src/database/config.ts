import mongoose from 'mongoose';

const dbConnection = async () => {

    try {

        mongoose.connect(process.env.MONGODB_CONN || ''
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true,
            //     useFindAndModify: false
            // }
        );

        console.log("MongoDB conectado");

    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar base de datos");
    }
}

export default dbConnection;