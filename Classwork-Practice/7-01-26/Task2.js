const cart = [
{ item: "Laptop", price: 50000, quantity: 1, inStock: true },
{ item: "Mouse", price: 1500, quantity: 2, inStock: true },
{ item: "Keyboard", price: 3000, quantity: 1, inStock: true }]
const Stock=cart.every(item=>item.inStock); /* Check if all items are in stock */

console.log(Stock ? "Ready To Ship" : "Wait"); /* Output "Ready To Ship" if all items are in stock, otherwise "Wait" */

