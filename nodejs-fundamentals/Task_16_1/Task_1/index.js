const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  switch (parsedURL.pathname) {
    case "/":
      res.writeHead(200, { "content-type": "text/html" });
      res.end("Welcome to Home Page");
      break;

    case "/complain":
      const name = parsedURL.query.name;
      const issue = parsedURL.query.issue;
      const priority = parsedURL.query.priority;
      const ticket = `TKT - ${Math.trunc(Math.random() * 100000)}`;
      const date = new Date().toLocaleString();
      const msg = `${ticket} |-> ${name} |-> ${issue} |-> [${date}]\n`;
      if (priority === "high") {
        fs.appendFile("URGENT.txt", msg, (err) => {
          if (err) {
            console.log("Error in high priority");
            return;
          }
          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              ticket: ticket,
              message: "We will solve your issue soon",
            })
          );
        });
      } else {
        fs.appendFile("normal_complaints.txt", msg, (err) => {
          if (err) {
            console.log("Error in normal or low priority");
            return;
          }
          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              ticket: ticket,
              message: "We will solve your issue soon",
            })
          );
        });
      }
      break;

    default:
      res.writeHead(404, { "content-type": "text/html" });
      res.end("Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
