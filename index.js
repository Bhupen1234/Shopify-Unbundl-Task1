import data from "./chocolatesData/data.json" assert { type: "json" };

const maxChocolates = 8;
let selectedChocolates = [];
let packQuantity = 1;
let totatPricePack = 0;

function init() {
  addChocolates();
}

function addChocolates() {
  data.forEach((ele, index) => {
    addChocolatesToDOM(ele, index);
  });
}

//Select the chocolate on response to select button
function selectChocolate(index,Button) {
  if (selectedChocolates.length < maxChocolates) {
    selectedChocolates.push(data[index]);
    addSelectedChocolates(selectedChocolates);
    Button.textContent="Remove"
    updateTotalPriceOfPack();
    if (selectedChocolates.length === maxChocolates) {
      updateTotalPrice();
    }
    console.log(selectedChocolates);
  } else {
    alert("You can add only 8 Chocolates per pack");
    
  }
}

//Remove the chocolate on response to remove button
function removeChocolate(id) {

  selectedChocolates = selectedChocolates.filter((ele) => ele.id !== id);

  addSelectedChocolates(selectedChocolates);
  updateTotalPriceOfPack();
  updateTotalPrice();

  if (selectedChocolates.length < maxChocolates) {
    packQuantity = 1;
    document.getElementById("pack-qty").textContent = 1;
  }
  console.log(selectedChocolates);
}

//Add chocolates from data to DOM

function addChocolatesToDOM(chocolate, index) {
  let rowelement = document.getElementById("chocolates-wrapper");

  let colelement = document.createElement("div");
  colelement.classList.add("col-6", "col-sm-6", "col-md-6", "col-lg-4");

  colelement.innerHTML = `
        <div class="card m-2" >
        <img src="./images/ChocolateImage.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="card-title">${chocolate.name}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">₹ ${chocolate.price}</h6>
        </div>
        <button  class="btn btn-primary button" data-id="${chocolate.id}"  style="width: 100%">Select</button>
         
        </div>
      </div>
        `;

  const Button = colelement.querySelector(".button");

  Button.addEventListener("click", () => {
    if (!selectedChocolates.includes(chocolate)) {
      selectChocolate(index,Button);
      
    } else {
        Button.textContent="Select"
      removeChocolate(chocolate.id);
    
    }
  });

  rowelement.append(colelement);
}

//Add selected chocolates to DOM
function addSelectedChocolates(selectedChocolates) {
  let selectedChocolatesContainer = document.getElementById(
    "selected-chocolates-pills"
  );
  selectedChocolatesContainer.innerHTML = "";
  selectedChocolates.forEach((chocolate) => {
    let chipElement = document.createElement("div");
    chipElement.classList.add("chip");

    chipElement.innerHTML = ` 
        ${chocolate.name}
        <span class="close-button"> </span>`;

    const removeButton = chipElement.querySelector(".close-button");

    removeButton.addEventListener("click", () => {
      removeChocolate(chocolate.id);
      const selectButton = document.querySelector(
        `button[data-id="${chocolate.id}"]`
      );
      if (selectButton) {
        selectButton.textContent = "Select";
      }
    });
    selectedChocolatesContainer.append(chipElement);
  });
}

//Update the total price of pack
function updateTotalPriceOfPack() {
   totatPricePack=0
  selectedChocolates.forEach((chocolate) => {
    totatPricePack += chocolate.price;
  });

  document.getElementById(
    "pack-price"
  ).textContent = `Pack Price: ₹ ${totatPricePack}`;
}

//Increase the qty of pack
function increasePackQuantity() {
  if (selectedChocolates.length === maxChocolates) {
    packQuantity += 1;
    document.getElementById("pack-qty").textContent = packQuantity;
    updateTotalPrice();
  } else {
    alert("Please select 8 Chocolates");
  }
}

//decrease the qty of pack
function decreasePackQuantity() {
  if (selectedChocolates.length === maxChocolates) {
    if (packQuantity > 1) {
      packQuantity -= 1;
    }

    document.getElementById("pack-qty").textContent = packQuantity;
    updateTotalPrice();
  }
}

//update the total price
function updateTotalPrice() {
  let totalPrice = 0;

  totalPrice = packQuantity * totatPricePack;
  if (selectedChocolates.length < maxChocolates) {
    totalPrice = 0;
  }

  document.getElementById(
    "total-price"
  ).textContent = `Total Price: ₹ ${totalPrice}`;
}

export { init, increasePackQuantity, decreasePackQuantity };
