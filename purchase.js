let tickets = {
    price : [500,250,2500],
    price2 : [100,500,5000],
    duration : [250,500,1000]
}

var adultsNum = 0;
var childNum = 0;

function calculateCost() {
    var tick_price = tickets["price"];
    var tick_price2 = tickets["price2"];
    var dur_price = tickets["duration"];

    var cost = 0;

    var tick = document.getElementById("cmbTicket").value;

    if(tick == ""){
        alert("Please select the ticket");
        document.getElementById("cmbTicket").focus();
        return;
    }

    var dur = document.getElementById("cmbDur").value;
    var children = document.getElementById("txtChildren").value;
    var adults = document.getElementById("txtAdults").value;

    if(children == "")
    children = 0;
    else
    children= parseInt(children);

    if(adults == "")
    adults = 0;
    else
    adults = parseInt(adults);

    tick = parseInt(tick);
    uprice = tick_price[tick];
    uprice2 = tick_price2[tick];

    if(dur=="") {
        dur_price[dur] = 0;
    }

    document.getElementById("divExtras").style = "display:block";
    var annual = document.getElementById("txtAnnual").value;
    var food = document.getElementById("txtFood").value;

    if (annual == "")
    annual = 0;
    else
    annual = parseInt(annual);

    if(food == "")
    food = 0;
    else
    food = parseInt(food);

    uprice3 = parseInt(5000);
    uprice4 = parseInt(500);

    cost = parseFloat((children * uprice)+(adults * uprice2)+dur_price[dur]+(annual * uprice3)+(food * uprice4));
    document.getElementById("spCost").innerHTML = cost.toFixed(2);


    adultsNum = adults;
    childNum = children;
}

function extras() {
    var divExtras = document.getElementById("divExtras");
    divExtras.style.display = optional.checked? "block" : "none";

}

function addToOrder() {
    var cost = parseFloat(document.getElementById("spCost").innerHTML);
    if(cost == 0){
        alert ("Please select the number of adults/children");
        return;
    }

    document.getElementById("divOrder").style = "display:block";
    var sub_total = parseFloat(document.getElementById("SubTotal").innerHTML);

    var ctrl_tick = document.getElementById("cmbTicket");
    var tick_name = ctrl_tick.options[ctrl_tick.selectedIndex].text;

    var ctrl_dur = document.getElementById("cmbDur");
    var dur_name = ctrl_dur.options[ctrl_dur.selectedIndex].text;

    var tbody = document.getElementById("tbody_order");
    var trow = tbody.insertRow(-1);

    td1 = trow.insertCell(0);
    td1.innerHTML = tick_name;

    td2 = trow.insertCell(1);
    td2.innerHTML = document.getElementById("txtAdults").value;

    td3 = trow.insertCell(2);
    td3.innerHTML = document.getElementById("txtChildren").value;

    td4 = trow.insertCell(3);
    td4.innerHTML = dur_name;

    td5 = trow.insertCell(4);
    td5.innerHTML = document.getElementById("txtAnnual").value;

    td6 = trow.insertCell(5);
    td6.innerHTML = document.getElementById("txtFood").value;

    var total = parseFloat(document.getElementById("spCost").innerHTML);
    sub_total = sub_total + total;

    td7 = trow.insertCell(6);
    td7.innerHTML = total.toFixed(2);
    td7.style = "text-align:right";

    td8 = trow.insertCell(7);
    td8.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";

    document.getElementById("SubTotal").innerHTML = sub_total.toFixed(2);

    calcLoyaltyPoints()
    resetPurchaseForm();
}

    function resetPurchaseForm() {
        document.getElementById("frmPurchase").reset();
        document.getElementById("spCost").innerHTML = "0.00";
    }

    function removeRecord(item) {
        var result = confirm("Do you want to remove this record?");

        if (result == true) {
            var table = document.getElementById("tbl_order");
            var sub_total = parseFloat(document.getElementById("SubTotal").innerHTML);
            var total = parseFloat(item.parentElement.cells[6].innerHTML);
            sub_total = sub_total - total;
            document.getElementById("SubTotal").innerHTML = sub_total.toFixed(2);
            table.deleteRow(item.parentElement.rowIndex);
        }
    }

    function placeOrder() {
        alert ("Thank You For Your Purchase!")
    }

    function mySubmit() {
        document.getElementById("confirm").innerHTML = "Thank You For Your Donation!";
        alert ("Thank You For Your Donation!")

    }
    

const formId = "frmPurchase"; 
const formDetector = `${formId}`; 
const saveButton = document.querySelector("#addFave"); 
const retrieveButton = document.querySelector("#retrieveFave");
const alertBox = document.querySelector(".alert"); 
let form = document.querySelector(`#${formId}`);
let formElements = form.elements; 

 const getFormData = () => {
  let data = { [formDetector]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  alert ("Your order has been saved as a favorite.Thank you!");
};

 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
   alert("Retrieved the order.");
    
  }
};

retrieveButton.onclick = function(){
    formautoRefill(); 
    calculateCost();

}

var grand_loyaltyPoints = 0;
var loyaltyPoints =0;
var totalTicket = 0;

function calcLoyaltyPoints(){

  totalTicket = totalTicket + adultsNum + childNum;

  if(totalTicket > 3){

      loyaltyPoints = 20 * totalTicket;

      grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints;

      localStorage.setItem("checkLoyalty",grand_loyaltyPoints);
  }
}

function showLoyaltyPoints(){

  grand_loyaltyPoints = JSON.parse(localStorage.getItem(`checkLoyalty`));
  if(grand_loyaltyPoints>0){
      alert("Congratulations!You have earned "+  grand_loyaltyPoints + " loyalty points so far");
  }
  else{
      alert("Sorry!You don't have any loyalty points so far");
  }
}