import { Sequelize } from 'sequelize';
require('dotenv').config();
const DB_SERVER=process.env.DB_SERVER;
const DB_NAME=process.env.DB_NAME;

 const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'msnodesqlv8/lib/sequelize',
  dialectOptions: {
    user: '',
    password: '',
    database: DB_NAME,
    options: {
      driver: '',
      connectionString: `Driver={ODBC Driver 17 for SQL Server};Server= ${DB_SERVER};Database=${DB_NAME};Trusted_Connection=yes;`,
      trustedConnection: true,
      instanceName: ''
    }
  },
  pool: {
    min: 0,
    max: 5,
    idle: 10000
  }
});
export default sequelize;