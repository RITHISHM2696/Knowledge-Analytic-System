require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
    return;
  }
  console.log("✅ Railway MySQL Connected Successfully");
});

module.exports = db;