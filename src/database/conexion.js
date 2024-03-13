const mysql = require('mysql2');
const { promisify } = require('util');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return err;
    }
    if (connection) connection.release();
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;