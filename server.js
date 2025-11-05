const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

// 🧱 Routes
app.get("/books", (req, res) => {
  db.query("SELECT * FROM Book", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

app.post("/books", (req, res) => {
  const { Title, Author, Publisher, Price, Category } = req.body;
  const sql = "INSERT INTO Book (Title, Author, Publisher, Price, Category) VALUES (?,?,?,?,?)";
  db.query(sql, [Title, Author, Publisher, Price, Category], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Book added successfully!");
  });
});

app.get("/members", (req, res) => {
  db.query("SELECT * FROM Member", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

app.post("/issue", (req, res) => {
  const { Book_ID, Member_ID, Staff_ID, Issue_Date, Due_Date, Fine } = req.body;
  const sql = "INSERT INTO Issue (Book_ID, Member_ID, Staff_ID, Issue_Date, Due_Date, Fine) VALUES (?,?,?,?,?,?)";
  db.query(sql, [Book_ID, Member_ID, Staff_ID, Issue_Date, Due_Date, Fine], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Book issued successfully!");
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
