let mysql = require('mysql');
let inquirer = require('inquirer');
const cTable = require('console.table');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runManager();
});

function runManager() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products",
        function (err, res, fields) {
            if (err) throw err;
            let newRes = [];
            for (let i =0; i < res.length; i++) {
                newRes.push(res[i]);
                if ((res[i].product_sales === null)) {
                    newRes[i].product_sales = 0;
                }
            }
            const table = cTable.getTable(newRes);
            console.log('');
            console.log(table);
            console.log('');
            runManager();
        });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res, fields) {
            if (err) throw err;
            let newRes = [];
            for (let i =0; i < res.length; i++) {
                newRes.push(res[i]);
                if ((res[i].product_sales === null)) {
                    newRes[i].product_sales = 0;
                }
            }
            const table = cTable.getTable(newRes);
            console.log('');
            console.log(table);
            console.log('');
            runManager();
        });
};

function addToInventory() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "What's the id of the product you'd like to resupply?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to add?"
        }]).then(function (input) {
            findQuantity(input.id,input.quantity);
        });
};

function addNewProduct() {
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "What product would you like to add?"
        }, {
            name: "department",
            type: "input",
            message: "In which department does this belong?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the unit price?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to have in stock?"
        }]).then(function (input) {
            let query = "INSERT INTO products(product_name, department_name,price,stock_quantity) values (?,?,?,?);"
            connection.query(query, [input.product, input.department, input.price, input.quantity],
                function (err, res, fields) {
                    if (err) throw err;
                    console.log('');
                    console.log('NEW PRODUCT ADDED!');
                    console.log('');
                    runManager();
                });
        })
};

function findQuantity(id,quantity) {
    let query = "SELECT item_id, product_name, price, stock_quantity, product_sales FROM products WHERE ?";
    connection.query(query, { item_id: id }, function (err, res) {
        let newStock = res[0].stock_quantity + quantity;
        updateQuantity(id, newStock)
    })
}

function updateQuantity(id, quantity) {
    let query = "UPDATE products SET stock_quantity = " + quantity + " WHERE ?";
    connection.query(query, { item_id: id }, function (err, res) {
        if (err) throw err;
        console.log('');
        console.log('PRODUCT RESUPPLIED!')
        console.log('');
        runManager();
    });
}