'use strict';

//MRP BUTTONS SCRIPT

//Reload Page with 'Start again' button
document.querySelector('.again').addEventListener('click', function () {
  location.reload();
  localStorage.clear();
  product_json = {};
  editFields = [];
});

let product_json = {};
let editFields = [];

//Flags
let editStockFlag = false;

//Add Product - alternative route (create elements)
document.querySelector('#add-product-btn').addEventListener('click', function () {
  editFields = [];
  document.querySelector('#add-product-btn').style.visibility = 'hidden';
  document.querySelector('#save-product-btn').style.visibility = 'visible';
  document.querySelector("#product-input").innerHTML = 
  `<div class = "input-section-content-L0">
  <h1>L0:</h1>
  <p>
    Product name <span><input class = "product_L0" id = "L0-name"/></span>
  </p>
  <p>
    Production time<span><input type = "number" class = "product_L0" id = "L0-production-time" /></span>
  </p>
  <button class="btn" id="add-L1" onclick = "addSubitemL1()">Add sub-item (L1) - Max (3)</button>
  </div>
  <div id = "L1-input"></div>`;
 if (product_json != {}) {
  document.querySelector('#L0-name').defaultValue = product_json['productName'];
  document.querySelector('#L0-production-time').defaultValue = product_json['productionTime'];
 };
});

let subitmesL1Count = 0;
let subitemsL2Count = {};

//Add subitems L1
function addSubitemL1() {
  if (subitmesL1Count<3) {
  subitmesL1Count += 1;
  subitemsL2Count[subitmesL1Count] = 0;
  const currentSubitemStructure = document.querySelector("#L1-input").outerHTML
  const newSubitemStructure = 
  `<div class = "input-section-content-L1" id = "L1_${subitmesL1Count}-input">
  <h2>L1:${subitmesL1Count}</h2>
  <p>
    Product name <span><input class="product_L0" id="L1_${subitmesL1Count}-name" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L1_${subitmesL1Count}-quantity" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L1_${subitmesL1Count}-production-time" /></span>
  </p>
  <button class="btn" id="add-L2-${subitmesL1Count}" onclick = "addSubitemL2(${subitmesL1Count})">Add subitem (L2) - Max (3)</button>
  </div>
  <div id = "L${subitmesL1Count}-2-input"></div>`;
  const fullSubitemStructure = currentSubitemStructure + newSubitemStructure
  document.querySelector("#L1-input").innerHTML = fullSubitemStructure
  };
  if (subitmesL1Count===3) {
    document.querySelector("#add-L1").innerHTML = `MAX subitems added!`
  };
  //console.log(subitmesL1Count)
};


//Add subitems L2
function addSubitemL2(L1ItemNumber) {
  if (subitemsL2Count[L1ItemNumber]<3) {
  subitemsL2Count[L1ItemNumber] += 1;
  const currentSubitemStructure = document.querySelector(`#L${L1ItemNumber}-2-input`).outerHTML
  const newSubitemStructure = 
  `<div class = "input-section-content-L2" id = "L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-input">
  <h3>L2:${L1ItemNumber}.${subitemsL2Count[L1ItemNumber]}</h3>
  <p>
    Product name <span><input class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-name" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-quantity" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-production-time" /></span>
  </p>
  </div>`;
  const fullSubitemStructure = currentSubitemStructure + newSubitemStructure
  document.querySelector(`#L${L1ItemNumber}-2-input`).innerHTML = fullSubitemStructure
  };
  if (subitemsL2Count[L1ItemNumber]===3) {
    document.querySelector(`#add-L2-${L1ItemNumber}`).innerHTML = `MAX subitems added!`
  };
};


//save product and display its structure
document.querySelector('#save-product-btn').addEventListener('click', function () {
  product_json['productName'] = document.querySelector('#L0-name').value;
  product_json['productionTime'] = Number(document.querySelector('#L0-production-time').value);
  //saving data to editfields check array for null values
  editFields.push(product_json['productName']);
  editFields.push(product_json['productionTime']);

  let productStructure = document.getElementById('product-structure');
  let productStructureText = '';
  let L0 = `<div class = "list-L0">
  <p class="text-OK">Product saved succesfully!</p>
  <p>Product L0:</p>
  <li>Product Name: ${product_json['productName']} </li>
  <li>Production/Assembly Time: ${product_json['productionTime']} day(s) </li>
  </div>`;

  let subItemsL1 = ``;

    for (let i = 1; i < subitmesL1Count+1; i++) {
      let nextIDName = `#L1_${i}-name`;
      let nextSubitemName = document.querySelector(nextIDName).value;
      let nextIDQuantity = `#L1_${i}-quantity`;
      let nextSubitemQuantity = document.querySelector(nextIDQuantity).value;
      let nextIDProductionTime = `#L1_${i}-production-time`;
      let nextSubitemProductionTime = document.querySelector(nextIDProductionTime).value;
      let newSubitem = `<div class = "list-L1">
      <p>L1: Subitem ${i}</p> 
      <li>     Product Name: ${nextSubitemName}</li> 
      <li>     Quantity: ${nextSubitemQuantity}</li>
      <li>     Production Time: ${nextSubitemProductionTime} day(s)</li>
      </div>`;
      subItemsL1 += newSubitem;

      //Extending Product JSON with subitems
      let jsonKeyL1 = `SubitemL1_${i}`;
      let jsonValueL1 = {};
      product_json[jsonKeyL1] = {};
      jsonValueL1['name'] = nextSubitemName;
      jsonValueL1['type'] = 'L1';
      jsonValueL1['quantity'] = Number(nextSubitemQuantity);
      jsonValueL1['productionTime'] = Number(nextSubitemProductionTime);
      // jsonValueL1['SubitemL2_1_1']={}
      product_json[jsonKeyL1] = jsonValueL1;
      //saving data to editfields check array for null values
      editFields.push(product_json[jsonKeyL1]['name']);
      editFields.push(product_json[jsonKeyL1]['quantity']);
      editFields.push(product_json[jsonKeyL1]['productionTime']);

      //Listing L2 subitems
      let subItemsL2 = ``;
      for (let j = 1; j < subitemsL2Count[i]+1; j++) {
        let nextL2IDName = `#L2_${i}_${j}-name`;
        let nextL2SubitemName = document.querySelector(nextL2IDName).value;
        let nextL2IDQuantity = `#L2_${i}_${j}-quantity`;
        let nextL2SubitemQuantity = document.querySelector(nextL2IDQuantity).value;
        let nextL2IDProductionTime = `#L2_${i}_${j}-production-time`;
        let nextL2SubitemProductionTime = document.querySelector(nextL2IDProductionTime).value;
        let newL2Subitem = `<div class = "list-L2">
        <p>L2: Subitem ${i}.${j}</p> 
        <li>     Product Name: ${nextL2SubitemName}</li> 
        <li>     Quantity: ${nextL2SubitemQuantity}</li>
        <li>     Production Time: ${nextL2SubitemProductionTime} day(s)</li>
        </div>`;
        subItemsL2 += newL2Subitem;

        //Extending Product JSON with subitems L2 for (i) Subitem L1
        let jsonKeyL2 = `SubitemL2_${i}_${j}`;
        let jsonValueL2 = {};
        jsonValueL2['name'] = nextL2SubitemName;
        jsonValueL2['type'] = 'L2';
        jsonValueL2['quantity'] = Number(nextL2SubitemQuantity);
        jsonValueL2['productionTime'] = Number(nextL2SubitemProductionTime);
        // console.log(jsonValueL2)
        product_json[jsonKeyL1][jsonKeyL2] = jsonValueL2;
        //saving data to editfields check array for null values
        editFields.push(product_json[jsonKeyL1][jsonKeyL2]['name']);
        editFields.push(product_json[jsonKeyL1][jsonKeyL2]['quantity']);
        editFields.push(product_json[jsonKeyL1][jsonKeyL2]['productionTime']);
      };
      subItemsL1 += subItemsL2
    };
  
  console.log(editFields);  
  //Reaction to nulls in product definition - smth not working yet
  if (editFields.includes(0)) {
    productStructure.innerHTML = `<p class = "text-error">Some fields were left empty. Please start again.</p>`
  } else {
    productStructure.innerHTML = productStructureText + L0 + subItemsL1;
    document.querySelector('#add-product-btn').style.visibility = 'visible';
    document.querySelector('#add-product-btn').innerHTML = 'Edit product';
    document.querySelector('#add-product-btn').style.backgroundColor = '#e6b400';
  };

  //Visibility actions upon save event
  document.querySelector('#save-product-btn').style.visibility = 'hidden';
  document.querySelector('.input-section-content-L0').style.visibility = 'hidden';
  document.querySelector("#product-input").innerHTML = ``;
  localStorage.setItem("productSchematic",JSON.stringify(product_json));

  //Log product json to console
  console.log(product_json);
});

//Adding stock quantities for the current schematic 
function addStock(){
  let jsonSchema = JSON.parse(localStorage.getItem("productSchematic"));

  //Checking if schematic data exists
  if(jsonSchema == null){
    document.querySelector('#input-stock').innerHTML = `
    <p><br>No schematics to create stock quantities from!</p>
    `;
  } else {
    document.querySelector('#save-stock-btn').style.visibility = 'visible';
    document.querySelector('#add-stock-btn').style.visibility = 'hidden';
    document.querySelector('#input-stock').innerHTML = `
    <p><br>Enter stock quantities for current schematic:</p>
    <div class="input-stock-L0">
    <h1>L0</h1>
    <p id="L0-stock-name">${jsonSchema['name']}</p>
    <span><input type="number" class="product_L0" id="L0-stock-quantity" value="0"/></span>

    `;

    //Generating elements recursively
    (function addNextLevels(schematic, level, name){
      let i = 0;
      for (let key in schematic) {
        if (key.toString().match(/\bSubitem/)) {
          i++;
          document.querySelector('#input-stock').innerHTML += `
          <div class="input-stock-L${level<3?level:2}">
          <h${level<6?level+1:6}>L${level}${name}-${i}</h${level<6?level+1:6}>
          <p id="L${level}${name}-${i}-stock-name">${schematic[key]['name']}</p>
          <span><input type="number" class="product_L0" id="L${level<3?level:2}${name}-${i}-stock-quantity" value="0"/></span>
          `;
          addNextLevels(schematic[key],level+1, name + `-${i}`);
          document.querySelector('#input-stock').innerHTML += `</div>`;
        }
      }
    })(jsonSchema, 1, '');

    document.querySelector('#input-stock').innerHTML += `</div>`;

    //Populating fields from existing json (if any values were at least once filled)
    if (editStockFlag) {
      let jsonStock = JSON.parse(localStorage.getItem("productStock"));
      for(let stockID in jsonStock){
        document.querySelector(`#${stockID}-stock-quantity`).value = jsonStock[stockID]['quantity'];
      }
    }
  }
}

//Saving stock quantities
function saveStock(){
  let jsonStock = {};
  jsonStock['L0'] = {};
  jsonStock['L0']['name'] = document.querySelector("#L0-stock-name").innerHTML;
  jsonStock['L0']['quantity'] = Number(document.querySelector("#L0-stock-quantity").value);

  //Finding all other values for jsonStock by checking if elements exist
  (function getDeeperStockValues(name, level){
    for(let i=1; true; i++){
      let newName = `L${level}${name}-${i}`;
      if(document.getElementById(`${newName}-stock-name`)){        
        jsonStock[`${newName}`] = {}
        jsonStock[`${newName}`]['name'] = document.querySelector(`#${newName}-stock-name`).innerHTML;
        jsonStock[`${newName}`]['quantity'] = Number(document.querySelector(`#${newName}-stock-quantity`).value);
        getDeeperStockValues(name + `-${i}`, level+1)
      } else {
        break;
      }
    }
  })('', 1);

  localStorage.setItem("productStock",JSON.stringify(jsonStock));
  document.querySelector('#save-stock-btn').style.visibility = 'hidden';
  document.querySelector('#add-stock-btn').style.visibility = 'visible';
  document.querySelector('#add-stock-btn').style.backgroundColor = '#e6b400';
  document.querySelector('#add-stock-btn').innerHTML = 'Edit stock';
  editStockFlag = true;
  document.querySelector('#input-stock').innerHTML = ``;
}

// Adding order for L0 product
function addOrder() {
  document.querySelector('#save-order-btn').style.visibility = 'visible';
  document.querySelector('#add-order-btn').style.visibility = 'hidden';
  document.querySelector('#input-order').innerHTML = `
  <p>Place order for L0 products: </p>
  <p>
  Quantity (ea.)<span><input type="number" class="product_L0" id = "order-quantity" value=""/></span>
  </p>
  <p>
  Time from now<span><input type="number" class="product_L0" id = "order-fulfillment" value=""/></span>
  </p>`;
  if (L0OrderQuantity) {
    document.querySelector('#order-quantity').defaultValue = L0OrderQuantity;
  }
  if (L0OrderTime) {
    document.querySelector('#order-fulfillment').defaultValue = L0OrderTime;
  }
};

let L0OrderQuantity = 0;
let L0OrderTime = 0;

//Saving Product Order
function saveOrder() {
  //Saving order data to variables
  L0OrderQuantity = Number(document.querySelector(`#order-quantity`).value);
  L0OrderTime = Number(document.querySelector('#order-fulfillment').value);
  
  let jsonOrder = {};

  jsonOrder['quantity'] = L0OrderQuantity;
  jsonOrder['time'] = L0OrderTime;
  localStorage.setItem("productOrder",JSON.stringify(jsonOrder)); 

  //styling at save event
  document.querySelector('#save-order-btn').style.visibility = 'hidden';
  document.querySelector('#add-order-btn').style.visibility = 'visible';
  document.querySelector('#add-order-btn').style.backgroundColor = '#e6b400';
  document.querySelector('#add-order-btn').innerHTML = 'Edit order';

  //Communication to user
  if (L0OrderQuantity && L0OrderTime) {
    document.querySelector('#input-order').innerHTML = 
    `<p>Order: ${L0OrderQuantity} ea. of L0 Product in ${L0OrderTime} days</p>
    <p>Mode: Verify feasibility of order.</p>`;
  } else if (L0OrderQuantity) {
    document.querySelector('#input-order').innerHTML = 
    `<p>Order: ${L0OrderQuantity} ea. of L0 Product.</p>
    <p>Mode: Estimate delivery time.</p>`;
  } else {
    document.querySelector('#input-order').innerHTML = `<p class = "text-error">No products were ordered! Edit order data</p>`
  };
}
