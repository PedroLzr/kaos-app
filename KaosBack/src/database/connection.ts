import { Sequelize } from 'sequelize';

// const db = new Sequelize(process.env.DB_NAME || 'kaosdb',
//                          process.env.DB_USER || 'user',
//                          process.env.DB_PASSWORD || '123456',
//                          {
//                             host: process.env.DB_HOST || 'localhost',
//                             port: parseInt(process.env.DB_PORT!) || 3306,
//                             dialect: 'mysql'
//                          });
                         
const db = new Sequelize(process.env.MYSQLDATABASE || 'kaosdb',
                         process.env.MYSQLUSER || 'user',
                         process.env.MYSQLPASSWORD || '123456',
                         {
                            host: process.env.MYSQLHOST || 'localhost',
                            port: parseInt(process.env.MYSQLPORT!) || 3306,
                            dialect: 'mysql'
                         });

export default db;