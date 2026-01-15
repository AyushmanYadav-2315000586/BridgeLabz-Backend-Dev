const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("response is closed");
});

server.listen(3000, () => {
  console.log("Server is running on post 3000");
});
