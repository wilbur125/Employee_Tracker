const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments?",
        "Add roles?",
        "Add employees?",
        "View departments?",
        "View roles?",
        "View employees?",
        "Update employee roles?"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments?":
        addDepts();
        break;

      case "Add roles?":
        addRoles();
        break;

      case "Add employees?":
        addEmployees();
        break;

      case "View departments?":
        viewDepts();
        break;

      case "View roles?":
        viewRoles();
        break;

        case "View employees?":
        viewEmployees();
        break;

        case "Update employee roles?":
        updateRoles();
        break;
      }
    });
}

function addDepts() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department SET ?";
      connection.query(query, { 
          name: answer.department 
        }, 
        function(err, res) {
            if (err) throw err;
            console.log("The department was added successfully!");
        runSearch();
      });
    });
}
