let mysql = require('mysql');
let inquirer = require('inquirer');
const cTable = require('console.table');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "password",
    database: "bamazon",
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) throw err;
    // runSupervisor();
    clearDepartments();
});

function runSupervisor() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;
            }
        });
}

function viewProductSales() {
    let query = "SELECT * FROM departments";
    connection.query(query,
        function (err, res, fields) {
            if (err) throw err;
            let newRes = [];
            for (let i =0; i < res.length; i++) {
                newRes.push(res[i]);
                if ((res[i].product_sales === null)) {
                    newRes[i].product_sales = 0;
                }
                newRes[i].total_profit = newRes[i].product_sales - newRes[i].over_head_costs;
            }
            const table = cTable.getTable(newRes);
            console.log('');
            console.log(table);
            console.log('');
            runSupervisor();
        });
};

function createNewDepartment() {
    inquirer
        .prompt([{
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        },
        {
            name: "overhead",
            type: "input",
            message: "What is the overhead cost?"
        }]).then(function (input) {
            let query = "INSERT INTO departments(department_name,over_head_costs) values (?,?);"
            connection.query(query, [input.department, input.overhead],
                function (err, res, fields) {
                    if (err) throw err;
                    console.log('');
                    console.log('NEW DEPARTMENT ADDED!');
                    console.log('');
                    runSupervisor();
                });
        })
};

function updateDepartments() {
    let query = "INSERT INTO departments(department_name,product_sales, over_head_costs) SELECT department_name, product_sales, FLOOR(RAND()*(1000)) FROM products GROUP BY department_name;";
    connection.query(query,
        function (err, res, fields) {
            if (err) throw err;
            runSupervisor();
        });
}

function clearDepartments() {
    let query = "DELETE FROM departments";
    connection.query(query,
        function (err, res, fields) {
            if (err) throw err;
            updateDepartments();
        });
}
