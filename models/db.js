const mysql = require('mysql2');

const config = require('../configs');

const pool = mysql.createPool(config.mysql.config).promise();

module.exports = pool;
