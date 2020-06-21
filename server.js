// Dependencies
require("dotenv").config();
const mysql = require("mysql");
const cTable = require("console.table");
var inquirer = require("inquirer");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to update database under .env file)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  // Your port; if not 3306
  port: process.env.DB_PORT,
  // Your username
  user: process.env.DB_USER,
  // Your password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
});
