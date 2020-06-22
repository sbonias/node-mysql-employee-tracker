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
  initialQuestion();
});

const displayIntro = () => {
  console.table("-----" + "EMPLOYEE TRACKER" + "-----");
};

const initialQuestion = () =>
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
            name: "View All Employee Data",
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
      if (answers.choice.toString() === "View All Employee Data") {
        viewAllEmpData();
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

const viewDept = () => {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) {
      throw err;
    }
    console.table(result);
    initialQuestion();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM employee_role", function (err, result) {
    if (err) {
      throw err;
    }
    console.table(result);
    initialQuestion();
  });
};

const viewEmp = () => {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) {
      throw err;
    }
    console.table(result);
    initialQuestion();
  });
};

// https://javarevisited.blogspot.com/2012/11/how-to-join-three-tables-in-sql-query-mysql-sqlserver.html
// had to use an "on clause"
const viewAllEmpData = () => {
  connection.query(
    "SELECT e.first_name,e.last_name,d.department,r.emp_title,r.emp_salary FROM employee e JOIN employee_role r ON r.id = e.role_id JOIN department d ON d.id = r.department_id",
    function (err, result) {
      if (err) {
        throw err;
      }
      console.table(result);
      initialQuestion();
    }
  );
};

const addDept = () => {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.item,
        },
        function (err) {
          if (err) throw err;
          console.log("New department added successfully!");
          initialQuestion();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the title of the role you would like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What starting salary would you like to assign to this role?",
      },
      {
        name: "deptid",
        type: "input",
        message: "What is the department id for this role?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee_role SET ?",
        {
          emp_title: answer.item,
          emp_salary: answer.salary,
          department_id: answer.deptid,
        },
        function (err) {
          if (err) throw err;
          console.log("New role added successfully!");
          initialQuestion();
        }
      );
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the role id for this employee?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the manager id for this employee?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId || 0,
        },
        function (err) {
          if (err) throw err;
          console.log("New employee added successfully!");
          initialQuestion();
        }
      );
    });
};

const updateEmpRole = () => {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which employee they'd like to alter their role
    inquirer
      .prompt([
        {
          name: "employeeId",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(
                results[i].id +
                  " " +
                  results[i].first_name +
                  " " +
                  results[i].last_name
              );
            }
            return choiceArray;
          },
          message: "Which employee are you requesting to update?",
        },
        {
          name: "newRole",
          type: "input",
          message: "What is this employees new role?",
        },
      ])
      .then(function (answer) {
        let chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.newRole,
            },
            {
              id: chosenItem.id,
            },
          ],
          function (error) {
            if (error) throw err;
            console.log("Employee Role Updated Successfully!");
            initialQuestion();
          }
        );
        // console.log(answer.newRole);
        // console.log(chosenItem);
      });
  });
};
