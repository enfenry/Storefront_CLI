DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
   item_id INTEGER(50) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT(20,2),
    stock_quantity INTEGER(50),
    product_sales FLOAT(20,2),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name,price,stock_quantity) values ('socks','clothing',10,200);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('guitar','musical instruments',300,80);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('headphones','electronics',21.50,140);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('soundbar','electronics',400,30);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('tie','clothing',25,640);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('shoes','clothing',60,800);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('guitar strings','musical instruments',7.65,320);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('Watchmen','books',32,50);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('Anna Karenina','books',13,300);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('Risk','board games',35,180);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('chess set','board games',25,760);
INSERT INTO products(product_name, department_name,price,stock_quantity) values ('Wolf In White Van','books',22,20);

CREATE TABLE departments (
    department_id INTEGER(50) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    over_head_costs FLOAT(20,2),
    product_sales FLOAT(20,2),
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name,product_sales, over_head_costs) 
SELECT department_name, product_sales, FLOOR(RAND()*(1000))
FROM products GROUP BY department_name;

