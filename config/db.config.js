const mysql =require('mysql');

//create mysql connection
const dbConn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123@com',
    database:'customerrestaurant'
})

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!')
})

module.exports=dbConn;