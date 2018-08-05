DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price INT,
  stock_quantity INT,
  
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Lamborghini Huracan LP 580", "Italian", 232000, 3), 
  ("Lamborghini Huracan LP 640", "Italian", 309000, 5),
  ("Honda Civic Type R", "Japan", 36000, 4), 
  ("BMW M3", "German", 68073, 7),
  ("BMW M5", "German", 57051, 20), 
  ("Nissan GT-R", "Japanese", 55000, 3),
  ("Subaru STI", "Japanese", 45000, 6), 
  ("Toyota MR2", "Japanese", 10000, 2),
  ("Nobel M600", "British", 374000, 1), 
  ("Lexus RC-F", "Japanese", 59513, 1),
  ("Chevrolet Corvette Z06", "American", 77650, 3), 
  ("Jaguar F-TYPE", "British", 62550, 4),
  ("Pagani Huayra", "Italian", 1400000, 1); 