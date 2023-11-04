var dbConn= require('../../config/db.config');

var FullOrder = function(fullOrder){
    this.OrderId=fullOrder.OrderId;
    this.OrderNumber=fullOrder.OrderNumber;
    this.MainDishId=fullOrder.MainDishId;
    this.OrderDate=new Date();
    this.Total=fullOrder.Total;
    this.SideDishes=Array.from(fullOrder.SideDishes);
    //this.desserts=fullOrder.desserts;
}
module.exports=FullOrder;