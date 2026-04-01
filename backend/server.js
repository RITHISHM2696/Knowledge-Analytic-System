
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/student", require("./routes/student"));
app.use("/auth", require("./routes/auth"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`API Base: http://localhost:${PORT}`);
  console.log(`================================\n`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    console.error("A backend instance is already running. Stop it first, then restart.");
    console.error("Windows commands:");
    console.error("1) netstat -ano | findstr :5000");
    console.error("2) taskkill /PID <PID> /F");
    process.exit(1);
  }

  console.error("Server startup error:", err.message);
  process.exit(1);
});
