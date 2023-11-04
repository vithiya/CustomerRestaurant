const OrderModel=require('../models/order.model');
const FullOrderModel=require('../models/fullorder.model');

//get all orders
exports.getOrders=(req,res)=>{
    console.log('Get all orders');
    OrderModel.getOrders((err,orders)=>{
        console.log('Orders are available');
        if(err)
            res.send(err);
        console.log('orders :'+ orders);
        res.send(orders);
    })
}

//get Daily sales revenue
exports.getDailySalesRevenue=(req,res)=>{
    console.log('Get daily sales revenue');
    OrderModel.getDailySalesRevenue((err,orders)=>{
        console.log('Daily sales revenue report');
        if(err)
            res.send(err);
        console.log('Daily sales revenue :'+ orders);
        res.send(orders);
    })
}

//get famous main dish
exports.getMostFamousMainDish=(req,res)=>{
    console.log('Get most famous main dish');
    OrderModel.getMostFamousMainDish((err,orders)=>{
        console.log('Most famous main dish report');
        if(err)
            res.send(err);
        console.log('Most famous main dish :'+ orders);
        res.send(orders);
    })
}

//get famous side dish
exports.getMostFamousSideDish=(req,res)=>{
    console.log('Get most famous side dish');
    OrderModel.getMostFamousSideDish((err,orders)=>{
        console.log('Most famous side dish report');
        if(err)
            res.send(err);
        console.log('Most famous side dish :'+ orders);
        res.send(orders);
    })
}

//get famous side dish main dish combo
exports.getMostFamousSideDishMainDishCombo=(req,res)=>{
    console.log('Get most famous main dish side dish combo');
    OrderModel.getMostFamousSideDishMainDishCombo((err,orders)=>{
        console.log('Most famous side dish main dish combo');
        if(err)
            res.send(err);
        console.log('Most famous main dish side dish combo :'+ orders);
        res.send(orders);
    })
}

//create new orders

exports.createNewOrder = (req, res) =>{
    const fullOrderReqData = new FullOrderModel(req.body);
    console.log('FullOrderReqData', fullOrderReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
            OrderModel.createOrder(fullOrderReqData, (err, order)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Order Created Successfully', data: order.insertId})
        })
    }
}
