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

// Initiate MySQL Connection
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
        viewDept();
      }
      if (answers.choice.toString() === "View Roles") {
        viewRole();
      }
      if (answers.choice.toString() === "View Employees") {
        viewEmp();
      }
      if (answers.choice.toString() === "Add Department") {
        addDept();
      }
      if (answers.choice.toString() === "Add Role") {
        addRole();
      }
      if (answers.choice.toString() === "Add Employee") {
        addEmp();
      }
      if (answers.choice.toString() === "Update Employee Role") {
        updateEmpRole();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });

const viewDept = () => {};
const viewRole = () => {};
const viewEmp = () => {};
const addDept = () => {};
const addRole = () => {};
const addEmp = () => {};
const updateEmpRole = () => {};
