const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 8000;

const filePath = path.join(__dirname, "data.json");

const readFromFile = async () => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeToFile = async (data) => {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/users", (req, res) => {
  res.send("<h1>This is users page</h1>");
});


app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`You are requesting for User Id: ${userId}`);
});

app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.json(students);
  }

  const foundStudents = students.filter((s) => s.branch == branch);
  res.json(foundStudents);
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const arrayIndex = students.findIndex((s) => s.id == id);
  if (arrayIndex < 0) {
    return res.status(404).send("Student not found");
  }

  res.json(students[arrayIndex]);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students/register", async (req, res) => {
  const { id, name, branch } = req.body;

  if (!id || !name || !branch) {
    return res.status(400).send("id, name and branch are required");
  }

  const studentsFromFile = await readFromFile();

  const existStudent = studentsFromFile.find((s) => s.id == id);
  if (existStudent) {
    return res.status(409).send(`Student with ID ${id} already exists`);
  }

  const newStudent = { id, name, branch };

  studentsFromFile.push(newStudent);
  await writeToFile(studentsFromFile);

  res.status(201).json(newStudent);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
