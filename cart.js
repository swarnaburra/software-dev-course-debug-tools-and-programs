const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  
  //validation of the discount rate- must be less than 0 like 0.1,0.2

  if (typeof discountRate !== "number" || discountRate <0 || discountRate > 1){
    throw new Error(" Invalid Discounted Rate.");
  }
  return total - total * discountRate; // 
}

function generateReceipt(cartItems, total) {

 if (isNaN(total)) total = 0;

  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price.toFixed(2)}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Fixed the Bug: total may not be a number
  return receipt;
}

// Debugging entry point
try{
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
console.log(total);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
console.log(discountedTotal);
const receipt = generateReceipt(cart, discountedTotal);
console.log(receipt);

document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
document.getElementById("receipt").textContent = receipt;
}
catch(error){

  console.error("An error has occurred:", error.message);
  document.getElementById("total").textContent= `error message: ${error.message} `;
  document.getElementById("receipt").textContent= "";
}