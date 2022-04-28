const mysql = require("mysql2");
const dotenv = require("dotenv").config();

module.exports = mysql.createConnection(process.env.DATABASE_URL)