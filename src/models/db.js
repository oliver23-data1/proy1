require('dotenv').config();
const sql = require('mssql');

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: 1433,
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // true si usas Azure
        trustServerCertificate: true // útil para entornos de desarrollo
    }
};

const poolPromise = sql.connect(sqlConfig)
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.log('Error de conexión:', err));

module.exports = { poolPromise };

