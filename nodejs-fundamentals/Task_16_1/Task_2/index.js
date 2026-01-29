const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  switch (parsedURL.pathname) {
    case "/":
      res.writeHead(200, { "content-type": "text/html" });
      res.end("Home Page");
      break;

    case "/admin":
      const user = parsedURL.query.user;
      const pass = parsedURL.query.pass;

      if (user === "admin" && pass === "1234") {
        fs.readFile("admin_dashboard.html", "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "content-type": "text/plain" });
            res.end("Server Error");
            return;
          }
          res.writeHead(200, { "content-type": "text/html" });
          res.end(data);
        });
      } else {
        res.writeHead(401, { "content-type": "text/html" });
        res.end("ACCESS DENIED");
      }
      break;

    default:
      res.writeHead(404, { "content-type": "application/html" });
      res.end("Route not found");
  }
});

server.listen(8000, () => {
  console.log("Server is running");
});
