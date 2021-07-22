var mysql = require("mysql2");
var bcrypt = require("bcryptjs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var dbConnection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456789a",
  database: "dongas",
});

module.exports = dbConnection;
