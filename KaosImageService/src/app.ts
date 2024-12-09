// import dotenv from 'dotenv';
import Server from './models/server';

console.log('Iniciando Kaos Image Service');

// console.log('PORT: ' + process.env.PORT)
// console.log('DB_HOST: ' + process.env.DB_HOST)
// console.log('DB_NAME: ' + process.env.DB_NAME)
// console.log('DB_USER: ' + process.env.DB_USER)
// console.log('DB_PASSWORD: ' + process.env.DB_PASSWORD)
// console.log('DB_PORT: ' + process.env.DB_PORT)
// console.log('JWT_PRIVATE_KEY: ' + process.env.JWT_PRIVATE_KEY)

const server = new Server();
server.listen();