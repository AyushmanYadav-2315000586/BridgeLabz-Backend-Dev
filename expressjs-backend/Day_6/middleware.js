const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

app.use((req, res, next) => {
  console.log("i m middleware");
  next();
});

const usersFilePath = path.join(__dirname, "students.json");

const loggerFile = async (req, res, next) => {
  try {
    const log = `Request at: ${new Date().toLocaleString()} | Method: ${req.method}\n`;
    await fs.appendFile("./log.txt", log, "utf-8");
    next();
  } catch (err) {
    console.error("Logging error:", err);
    next();
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Token Missing" });
  }
  if (token !== "bearertoken") {
    return res.status(403).json({ message: " Invalid Token" });
  }
  next();
};

const readStudentsFromFile = async () => {
  const data = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile(usersFilePath, JSON.stringify(records, null, 2));
};
app.get("/students/", authMiddleware, loggerFile, async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});

app.post("/students/register", authMiddleware, async (req, res) => {
  try {
    const { id, name, age, city } = req.body;
    if (!id || !name || !age || !city) {
      return res.status(400).send("Id, Name , Age and City are required");
    }

    const students = await readStudentsFromFile();
    const existingCheck = students.find((s) => s.id == id);
    if (existingCheck) {
      return res.status(409).send(`Student with ID ${id} already exists`);
    }

    const newStudent = { id, name, age, city };
    students.push(newStudent);
    await writeStudentsToFile(students);
    res.status(201).send("Student added");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});
app.put("/students/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

app.delete("/students/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});
