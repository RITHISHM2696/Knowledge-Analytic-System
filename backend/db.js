
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "royalenfield",
  database: process.env.DB_NAME || "kas_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect(err => {
  if (err) {
    console.error("❌ Database Connection Error:");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed");
    }
    if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.error("Database had a fatal error");
    }
    if (err.code === "PROTOCOL_ENQUEUE_AFTER_CLOSE") {
      console.error("Database connection was manually closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections");
    }
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Database access was denied (wrong credentials)");
    }
    if (err.code === "ER_BAD_DB_ERROR") {
      console.error("Database does not exist");
    }
    throw err;
  }
  console.log("✅ MySQL Connected Successfully");
});

// Reconnect if connection is lost
db.on("error", err => {
  console.error("Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    db.connect();
  }
});

module.exports = db;
