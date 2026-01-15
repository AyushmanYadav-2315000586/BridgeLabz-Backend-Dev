function checkOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === "number") {
        resolve("Order Shipped");
      } else {
        reject("Invalid Order ID");
      }
    }, 1000);
  });
}

// Consumer function
async function handleOrder(orderId) {
  try {
    const result = await checkOrderStatus(orderId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Test
handleOrder(123);      // Order Shipped
handleOrder("ABC");   // Invalid Order ID
