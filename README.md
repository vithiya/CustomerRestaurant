# CustomerRestaurant
Node Mysql food ordering web application

In this repo I have created the restful api using nodejs, express and mysql.Front end page using html javascript and css

Author : Vithiya

MySQL configuration

Please create database, use config/dbscript.sql to create tables and make the changes in the config/db.config.js file.

In the project directory, you can run:

npm install

This will install the dependencies inside node_modules

npm start

Runs the app in the development mode.

Open http://localhost:5000/order to view it in the browser.

you can use following API end point to test backend

GET /api/v1/order – Will retrieve all order details

GET /api/v1/order/dailySales – Will retrieve total revenue for current date

GET /api/v1/order/famousMainDish – Will retrieve Most famous main dish

GET /api/v1/order/famousSideDish- Will retrieve most famous side dish

GET /api/v1/order/famousDishCombo- Will retrieve famous main dish and side dish combo

POST /api/v1/order- Will create new order
