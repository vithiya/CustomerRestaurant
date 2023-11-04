var dbConn= require('../../config/db.config');

var Order = function(order){
    this.OrderId=order.OrderId;
    this.OrderNumber=order.OrderNumber;
    this.MainDishId=order.MainDishId;
    this.OrderDate=new Date();
    this.Total=order.Total;
}


//get all orders
Order.getOrders=(result)=>{
    dbConn.query('SELECT * FROM orders INNER JOIN maindish ON orders.MainDishID= maindish.ID', (err,res)=>{
        if(err){
            console.log('Error while fetching orders',err);
            result(null,err);
        }else{
            console.log("orders fetched successfully");
            result(null,res);
        }
    })
}

//get daily sales revenue
Order.getDailySalesRevenue=(result)=>{
    dbConn.query('SELECT SUM(Total) AS DailySales FROM orders where date(OrderDate)=curdate()', (err,res)=>{
        if(err){
            console.log('Error while fetching daily sales revenue',err);
            result(null,err);
        }else{
            console.log("Daily saless revenue fetched successfully");
            result(null,res);
        }
    });   
}

//get most famous main dish
Order.getMostFamousMainDish=(result)=>{
    dbConn.query('SELECT orders.MainDishID, maindish.Name,COUNT(orders.MainDishID) Occurrance '
                    +'FROM orders INNER JOIN maindish ON orders.MainDishID= maindish.ID GROUP BY orders.MainDishID '
                    +'ORDER BY Occurrance DESC  LIMIT 1', (err,res)=>{
        if(err){
            console.log('Error while fetching most famous main dish',err);
            result(null,err);
        }else{
            console.log("Most famous main dish fetched successfully");
            result(null,res);
        }
    });   
}

//get most famous side dish
Order.getMostFamousSideDish=(result)=>{
    dbConn.query('SELECT sidedish.ID,sidedish.Name,COUNT(sidedishdetails.SideDishID) Occurrance ' 
                    +'FROM orders INNER JOIN sidedishdetails ON orders.OrderID=sidedishdetails.OrderID INNER JOIN sidedish ON sidedish.ID=sidedishdetails.SideDishID '
                    +'GROUP BY sidedish.ID ORDER BY Occurrance DESC limit 1'
    , (err,res)=>{
        if(err){
            console.log('Error while fetching most famous side dish',err);
            result(null,err);
        }else{
            console.log("Most famous side dish fetched successfully");
            result(null,res);
        }
    });   
}

//get most famous side dish-main dish combo
Order.getMostFamousSideDishMainDishCombo=(result)=>{
    dbConn.query('SELECT orders.MainDishID,maindish.Name as MainDish,sidedish.ID, sidedish.Name as SideDish, COUNT(orders.OrderID) Occurrance ' 
                    +'FROM orders INNER JOIN sidedishdetails ON orders.OrderID= sidedishdetails.OrderID INNER JOIN '
                    + 'sidedish ON sidedish.ID=sidedishdetails.SideDishID INNER JOIN '
                     + 'maindish ON orders.MainDishId =maindish.ID GROUP BY maindish.ID,sidedish.ID ORDER BY Occurrance DESC limit 1'
    , (err,res)=>{
        if(err){
            console.log('Error while fetching most famous main dish side dish combo',err);
            result(null,err);
        }else{
            console.log("Most famous main dish side dish combo fetched successfully");
            result(null,res);
        }
    });   
}

//Create New Order
Order.createOrder = (fullOrderReqData, result) =>{
    const orderReqData = new Order(fullOrderReqData);
    let sideDishes=fullOrderReqData.SideDishes;
    let sideDishes1=[5,6];
    console.log('fullOrderReqData'+JSON.stringify(fullOrderReqData));
    dbConn.query('INSERT INTO orders SET ? ', orderReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            
            
            const lastInsertedId = res.insertId;
            
            console.log('orderId'+lastInsertedId);
            console.log('sidedishes'+sideDishes1);
            dbConn.query(
                'INSERT INTO sidedishdetails (OrderID, SideDishID,Quantity) VALUES ?',
                [sideDishes1.map(sideDish => [lastInsertedId, sideDish,1])],
                (err, res) => {
                    if(err){
                        console.log('Error while inserting side dish data'+err.message);
                        result(null, err);
                    }else{
                        console.log('Order created successfully');
                        result(null, res)
                    }
                }
            );
            // console.log('Order created successfully');
            // result(null, res)
        }
    })
}

module.exports=Order;