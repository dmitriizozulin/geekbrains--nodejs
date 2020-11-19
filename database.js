const mysql = require('mysql2/promise');

const mysql_options = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sakila',
  waitForConnections: true,
};

module.exports = mysql.createPool(mysql_options);
