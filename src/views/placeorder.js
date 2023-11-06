var editFormData;

function getFormData() {
    var siddishSelect =document.getElementById("sideDishes");
    var sideDishResults = getSelectValues(siddishSelect);
    return {
        OrderNumber:document.getElementById("orderno").value,
        MainDishId:JSON.parse(document.getElementById("mainDishes").value).Id,
        SideDishes:getSideDishIds(sideDishResults),
        Total:calculateTotal(sideDishResults)
        //desserts:document.getElementById("desserts").value
    }
}
function calculateTotal(sideDishResults) {
    var sideDishTotal=calculateSideDishTotal(sideDishResults);
    return Number(JSON.parse(document.getElementById("mainDishes").value).Price) +
           sideDishTotal +
           Number (JSON.parse(document.getElementById("desserts").value).Price);
}

function calculateSideDishTotal(sideDishResults){
    var total=0;
    for (var key in sideDishResults) {
        var obj = sideDishResults[key];
        total=total+Number(JSON.parse(obj).Price);
    }
    return total;
}
function clearFormData() {
        document.getElementById("orderno").value = "";
        document.getElementById("mainDishes").value="";
        document.getElementById("sideDishes").value="";
        document.getElementById("desserts").value="";
}

function setFormData(orderno,mainDishes,sideDishes,desserts) {
    document.getElementById("orderno").value = orderno;
    document.getElementById("mainDishes").value = mainDishes;
    document.getElementById("sideDishes").value = sideDishes;
    document.getElementById("desserts").value = desserts;
}

// set the message for form status
function setSuccessMessage(message) {
    document.getElementById("message").innerHTML = message;
}

// callled this function when user click on button
function submitForm() {
        if(!editFormData) placeOrder();
}

// place order function
function placeOrder() {
        let payload  = getFormData();
        fetch("http://localhost:5000/api/v1/order",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json()).then((response)=>{
            setSuccessMessage(response.message)
                // clear input
                clearFormData();
                getAllOrders(); // reload table 
        })
}

// edit data 
function editData() {
    var formData = getFormData();
    formData['id'] = editFormData._id;
        fetch("http://localhost:3000/crud/updateData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }).then((res)=>res.json()).then((response)=>{
            setSuccessMessage(response.message)
                clearFormData(); // clear the form field
                getAllOrders() // reload the table
                getDailySalesRevenue();
                getFamousMainDish();
                getFamousSideDish();
                getFamousDishCombo();

        })
}

// get orders

function getAllOrders() {
                fetch("http://localhost:5000/api/v1/order").then(
                    (res)=>res.json()
                ).then((response)=>{
                    var tmpData  = "";
                    console.log(response);
                    response.forEach((order)=>{
                        tmpData+="<tr>"
                        tmpData+="<td>"+order.OrderNumber+"</td>";
                        tmpData+="<td>"+order.Name+"</td>";
                        //tmpData+="<td><button class='btn btn-primary' onclick='editDataCall(`"+user._id+"`)'>Edit</button></td>";
                        //tmpData+="<td><button class='btn btn-danger' onclick='deleteData(`"+user._id+"`)'>Delete</button></td>";

                        tmpData+="</tr>";
                    })
                    document.getElementById("tbData").innerHTML = tmpData;
                })     
        }

getAllOrders();

function getDailySalesRevenue() {
        fetch("http://localhost:5000/api/v1/order/dailySales").then(
            (res)=>res.json()
        ).then((response)=>{
            console.log(response);
            document.getElementById("revenue").innerHTML = response[0].DailySales;
        })     
}

getDailySalesRevenue();

function getFamousMainDish() {
        fetch("http://localhost:5000/api/v1/order/famousMainDish").then(
            (res)=>res.json()
        ).then((response)=>{
            console.log(response);
            document.getElementById("famousMainDish").innerHTML = response[0].Name;
            document.getElementById("mainDishCount").innerHTML = response[0].Occurrance;
        })     
}

getFamousMainDish();

function getFamousSideDish() {
        fetch("http://localhost:5000/api/v1/order/famousSideDish").then(
            (res)=>res.json()
        ).then((response)=>{
            console.log(response);
            document.getElementById("famousSideDish").innerHTML = response[0].Name;
            document.getElementById("sideDishCount").innerHTML = response[0].Occurrance;
        })     
}

getFamousSideDish();

function getFamousDishCombo() {
        fetch("http://localhost:5000/api/v1/order/famousDishCombo").then(
            (res)=>res.json()
        ).then((response)=>{
            console.log(response);
            document.getElementById("dishComboMain").innerHTML = response[0].MainDish;
            document.getElementById("dishComboSide").innerHTML = response[0].SideDish;
            document.getElementById("dishCount").innerHTML = response[0].Occurrance;
        })     
}

getFamousDishCombo();

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
function getSideDishIds(sideDishResults){
    var sideDishIds=[];
    for (var key in sideDishResults) {
        var obj = sideDishResults[key];
        sideDishIds.push(JSON.parse(obj).Id);
    }
    return sideDishIds;
}
