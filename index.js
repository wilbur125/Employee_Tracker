// initialize mysql connection
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
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
      let query = "INSERT INTO department SET ?";
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

function addRoles() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        console.log("what does it look like?", results)
        let items = results;
        console.log(items);    
        let deptChoices = items.map(function(item) {
            return item['name'];
        })
        console.log("choices", deptChoices);

    inquirer
      .prompt([
        {
            name: "title",
            type: "input",
            message: "What title would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What salary would you like to add?"
        },
        {
            name: "deptId",
            type: "list",
            message: "Which department does this role belong to?",
            choices: deptChoices
        }
    ])
      .then(function(answer) {
        var query = "INSERT INTO role SET ?";
        connection.query(query, { 
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptId
          }, 
          function(err, res) {
              if (err) throw err;
              console.log("The role was added successfully!");
          runSearch();
        });
      });
    });
  }

function addEmployees() {

    let query = "SELECT * FROM role";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        console.log("what does it look like?", results)
        let items = results;
        console.log(items);    
        let roleChoices = items.map(function(item) {
            return item['title'];
        })
        console.log("choices", roleChoices);

inquirer
    .prompt([
        {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
        }, 
        {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
        }, 
        {
        name: "roleId",
        type: "list",
        message: "What is this employees role?",
        choices: roleChoices
        }, 
        {
        name: "managerId",
        type: "input",
        message: "What is their manager's ID number?"
        }, 
    ])
    .then(function(answer) {
    var query = "INSERT INTO employee SET ?";
    connection.query(query, { 
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: managerId
        }, 
        function(err, res) {
            if (err) throw err;
            console.log("The employee was added successfully!");
        runSearch();
    });
});
});
}

function viewDepts(){
    let query = "SELECT * FROM department";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        
        console.log("\n\nHere are the departments:");
        console.table(results);
        console.log("-----------\n\n");

        console.log("what does it look like?", results)
        runSearch();
    });
}

function viewRoles(){
    let query = "SELECT * FROM role";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        
        console.log("\n\nHere are the roles:");
        console.table(results);
        console.log("-----------\n\n");
        runSearch();
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        
        console.log("\n\nHere are the employees:");
        console.table(results);
        console.log("-----------\n\n");
        runSearch();
    });
}

function updateRoles() {

    let query = "SELECT * FROM employee";
    connection.query(query, function(err, results, fields) {
        if(err) throw error;
        console.log("what does it look like?", results)
        let items = results;
        console.log(items);    
        let employeeChoices = items.map(function(item) {
            return item["last_name"];
        })
        console.log("choices", employeeChoices);

        let query = "SELECT * FROM role";
        connection.query(query, function(err, results, fields) {
        if(err) throw error;
        console.log("what does it look like?", results)
        let items = results;
        console.log(items);    
        let roleChoices = items.map(function(item) {
            return item['title'];
        })
        console.log("choices", roleChoices);


    inquirer    
        .prompt([
            {
                name: "lastName",
                type: "list",               
                message: "Which employee's role do you want to change?",
                choices: employeeChoices
            },
            {
                name: "roleId",
                type: "list",               
                message: "Which role will it change to?",
                choices: roleChoices
            }
        ])
        .then(function(answer) {
            var query = `UPDATE employee SET role_id = '${answer.roleId}' WHERE last_name = '${answer.lastName}'`;
            console.log(query);
            connection.query(query, { 
                last_name: answer.lastName,
                role_id: answer.roleId,
                }, 
                function(err, res) {
                    if (err) throw err;
                    console.log("The employee's role was changed successfully!");
                runSearch(); 
            });
        });
      });
    });
}