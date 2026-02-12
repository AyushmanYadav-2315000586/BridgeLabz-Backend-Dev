const express = require("express");
const path = require("path");

const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "student.json");

const readFile = async (req, res) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

app.get("/", async (req, res) => {
  const student = await readFile();
  res.render("form", { student });
});

app.post("/students/register", async (req, res) => {
  const { name, branch } = req.body;
  console.log(name, branch);
  const student = await readFile();
  const newId = student.length > 0 ? student[student.length - 1].id + 1 : 1;
  student.push({ id: newId, name, branch });
  await writeFile(student);
  res.status(201).send(`
    <h2>Student Registered Successfully</h2>
    <p>Redirecting to home page....</p>
    <script>
      setTimeout(()=>{
        window.location.href="/";
        },2000)
    </script>
    `);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
