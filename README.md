# Storefront_CLI
The Bamazon Storefront CLI is an Amazon-like Storefront command line simulator using MySQL.

### [Watch the Demo Video](https://streamable.com/la6by)
* (Video also available for download within the repository)

## Installing Locally
Git clone the repository to your local machine: 

HTTPS:
```
$ git clone https://github.com/enfenry/Storefront_CLI.git
```
SSH:
````
$ git clone git@github.com:enfenry/Storefront_CLI.git
````

Next, within the repository, install necessary dependencies by running:
````
$ npm install
````

You should now be able to use Storefront CLI.

## Using Storefront CLI
Please see the demo video linked above or the following list of features/commands.
There are 3 separate interfaces depending on the account type of the user:
  * Customer
  * Manager
  * Supervisor

Please see each section below for further detail on using these interfaces.

### Customer Use
* Start the interface and display a list of items available. It will then prompt you to enter the id and quantity of the product you'd like to buy.
````
$ node bamazonCustomer.js
````

### Manager Use
* Start the interface and view a menu of available actions:
  * View products for sale
  * View items that are low on inventory
  * Add more quantities of a product to the inventory (this will prompt for the id of the product and quantity to re-stock 
  * Add a new product to the inventory (this will prompt for a new product name, unit price, quantity to add, and department the item belongs to).
  
````
$ node bamazonManager.js
````

### Supervisor Use
* Start the interface and view a menu of available actions:
  * View product sales by Department
  * Create a new Department (this will prompt for a department name and initial overhead cost)
````
$ node bamazonSupervisor.js
````

## Built Using
   * [Inquirer.js](https://www.npmjs.com/package/inquirer) - Command Line User Interface Library

   * [mysql-npm](https://www.npmjs.com/package/mysql) - Node.js Drive for MySQL

   * [console.table](https://www.npmjs.com/package/console.table) - Command Line Table Formatting

