const express = require("express");

const app = express();

const PORT = 8000;

const data = [
  {
    id: 1,
    name: "Ayushman",
    branch: "CSE",
  },
  {
    id: 2,
    name: "Divyansh",
    branch: "CSE",
  },
  {
    id: 3,
    name: "Avrial",
    branch: "BBA",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome To Home Page!");
});

app.get("/student", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
