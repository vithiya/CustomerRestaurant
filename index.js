const express =require('express');
const bodyParser = require('body-parser');
const path = require('path');

//create express app
const app=express();

//setup the server port
const port = process.env.port || 5000;



// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));

//define root route
app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get('/order',(req,res)=>{
    res.sendFile(__dirname + '/src/views/order.html');
});

//import order routes
const orderRoutes=require('./src/routes/order.route')

app.use('/api/v1/order',orderRoutes);

//listen to the port
app.listen(port,()=>{
    console.log(`Express server is running at ${port}`);
});