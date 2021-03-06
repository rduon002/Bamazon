let mysql = require("mysql");
let inquirer = require("inquirer");
let Table = require('cli-table');

//Info for sql database connection
let connection = mysql.createConnection({
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "diablo2",
    database: "bamazonDB"
});

//Connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

//Function display table in terminal
function displayProducts(answer) {
    let query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
    connection.query(query, function (err, res) {
        //Construct table through CLI table utility
        let displayTable = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],

            colWidths: [10, 30, 20, 10, 14]
        });

        for (let i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        productSearch();
    });
}

//Operation suggestions for client making purchase
function productSearch(answer) {
    inquirer.prompt([{
            name: "item",
            type: "input",
            message: "What is the ID of the product?"
        },
        {
            name: "count",
            type: "input",
            message: "What quantity would you like?"
        }
        //Once user has selected a product query data base    
    ]).then(function (answer) {
        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", {
            item_id: answer.item
        }, function (err, res) {
            //Determine if stock available and prompt user otherwise
            if (parseInt(answer.count) > res[0].stock_quantity) {

                console.log("We apologize. This product is no longer available." + res[0].stock_quantity + " left");
                productSearch();

            //If in stock and user would like to order, prompt user, complete order, and update db    
            } else {
                console.log("Your order of " + answer.count + ' ' + res[0].product_name + "'s total cost is:"); 
                console.log("$ " + parseInt(res[0].price) * parseInt(answer.count));
                //Subtract from current quantity after purchase 
                let quantityLeft = res[0].stock_quantity - answer.count;
                console.log(quantityLeft);
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: quantityLeft,
                        },
                        {
                            item_id: answer.item
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Inventory updated. There are  " + quantityLeft + " left");
                        displayProducts();
                    });
            }
        })
    });

};