const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Welcome To Home Page");
});

app.get("/users", (req, res) => {
  res.send("<h1>This is user's page</h1>");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`You are asking for user id: ${userId}`);
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
