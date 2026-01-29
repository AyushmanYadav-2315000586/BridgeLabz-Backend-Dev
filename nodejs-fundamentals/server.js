const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end("Server is running");

  let logTime = new Date().toLocaleString();
  const method = req.method;
  const requestedUrl = req.url;

  let msg = `${logTime} - ${method} requested for ${requestedUrl}\n`;
  fs.appendFile("text.log", msg, (err) => {
    if (err) console.log("Error writting log");
  });

  const parsedURL = url.parse(req.url, true);
  console.log(parsedURL);
  const name = parsedURL.query.name || "Guest";

  switch (parsedURL.pathname) {
    case "/":
      res.end("Welcome to Home Page");
      break;
    case "/about":
      res.writeHead(200, { "content-type": "text/html" });
      res.end(`<h1>Welcome to about Us, My name is ${name}</h1>`);
      break;
    default:
      res.writeHead(404, { "content-type": "text/html" });
      res.end("Error! Page Not Found");
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
