const pool = require('../../database/conexion');
const mysql = require('../../database/mysql');
const model = require('./model');

const list = async (req, res) => {
    const query = mysql.list(model.TABLA);
    const result = await pool.query(query);
    res.send(result);
};

module.exports = {
    list
};