const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const sql_password = process.env.SQL_PASS;

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: sql_password,
  database: "dna_pattern_matching"
})