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
    displayCustomer();
});

function displayCustomer() {
    connection.query("SELECT item_id, product_name, price FROM products",
        function (err, res, fields) {
            if (err) throw err;
            const table = cTable.getTable(res);
            console.log('');
            console.log(table);
            console.log('');
            runCustomer();
        });
};

function runCustomer() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "What's the id of the product you'd like to buy?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }]).then(function (input) {
            checkQuantity(input.id, parseInt(input.quantity));
        });
}

function checkQuantity(id, quantity) {
    let query = "SELECT item_id, product_name, price, stock_quantity,product_sales FROM products WHERE ?";
    connection.query(query, { item_id: id }, function (err, res) {
        if (quantity > res[0].stock_quantity) {
            console.log('');
            console.log('INSUFFICIENT QUANTITY!');
            console.log('');
            runCustomer();
        }
        else {
            let newPurchase = res[0].price * quantity;
            let newSales = res[0].product_sales + newPurchase;
            let newStock = res[0].stock_quantity - quantity;
            console.log('');
            console.log("YOUR PURCHASE:");
            console.log(res[0].product_name);
            console.log("$" + res[0].price + " x " + quantity + " = $" + newPurchase);
            console.log('');
            updateProduct(id, newStock,newSales)
        }
    })
}

function updateProduct(id, quantity,sales) {
    let query = "UPDATE products SET stock_quantity = " + quantity +  ", product_sales = " + sales + " WHERE ?";
    connection.query(query, { item_id: id }, function (err, res) {
        if (err) throw err;
        runCustomer();
    });
}