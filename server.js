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
  displayIntro();
  askQuestion();
});

const displayIntro = () => {
  console.table("-----" + "EMPLOYEE TRACKER" + "-----");
};

const askQuestion = () =>
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "checkbox",
        message: "Select Employee Role",
        name: "choice",
        choices: [
          {
            name: "View Departments",
          },
          {
            name: "View Roles",
          },
          {
            name: "View Employees",
          },
          {
            name: "Add Department",
          },
          {
            name: "Add Role",
          },
          {
            name: "Add Employee",
          },
          {
            name: "Update Employee Role",
          },
        ],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      if (answers.choice.toString() === "View Departments") {
        TBD();
      }
      if (answers.choice.toString() === "View Roles") {
        TBD();
      }
      if (answers.choice.toString() === "View Employees") {
        TBD();
      }
      if (answers.choice.toString() === "Add Department") {
        TBD();
      }
      if (answers.choice.toString() === "Add Role") {
        TBD();
      }
      if (answers.choice.toString() === "Add Employee") {
        TBD();
      }
      if (answers.choice.toString() === "Update Employee Role") {
        TBD();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
