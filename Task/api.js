const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  switch (parsedURL.pathname) {
    case "/product":
      const name = parsedURL.query.name;
      const price = parsedURL.query.price;
      const discount = parsedURL.query.discount;

      const disCal = (price * discount) / 100;
      const finalPrice = price - disCal;
      let msg = `The final price is ${finalPrice}\n`;
      fs.appendFile("searches.txt", msg, (err) => {
        if (err) console.log("Error Calculating");
      });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1>Product Search Result</h1>
        <p><b>Product:</b> ${name}</p>
        <p><b>Original Price:</b> $${price}</p>
        <p><b>Discount:</b> ${discount}%</p>
        <p><b>Final Price:</b> $${finalPrice}</p>
      `);
      break;

    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Welcome to Home Page</h1>");
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(7000, () => {
  console.log("Server is running");
});
