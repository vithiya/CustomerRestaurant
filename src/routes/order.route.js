const express=require('express');
const router=express.Router();

const OrderController=require('../controllers/order.controller')

//get orders
router.get('/',OrderController.getOrders);

//get daily sales revenue
router.get('/dailySales',OrderController.getDailySalesRevenue);

//get most famous main dish
router.get('/famousMainDish',OrderController.getMostFamousMainDish);

//get most famous side dish
router.get('/famousSideDish',OrderController.getMostFamousSideDish);

//get most famous side dish main dish combo
router.get('/famousDishCombo',OrderController.getMostFamousSideDishMainDishCombo);

//create orders
router.post('/',OrderController.createNewOrder);

module.exports=router;