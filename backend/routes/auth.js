const express = require("express");
const router = express.Router();
const db = require("../db");

const validRoles = ["student", "teacher"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/login", (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password and role are required" });
    }

    const normalizedRole = String(role).toLowerCase().trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    if (!validRoles.includes(normalizedRole)) {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    if (password !== "1234") {
      return res.status(401).json({ error: "Invalid password" });
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS login_roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        role ENUM('student', 'teacher') NOT NULL,
        login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createTableQuery, (createErr) => {
      if (createErr) {
        console.error("Database error:", createErr);
        return res.status(500).json({ error: "Failed to initialize login table" });
      }

      const insertQuery = "INSERT INTO login_roles (email, role) VALUES (?, ?)";
      db.query(insertQuery, [normalizedEmail, normalizedRole], (insertErr) => {
        if (insertErr) {
          console.error("Database error:", insertErr);
          return res.status(500).json({ error: "Failed to store login role" });
        }

        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            email: normalizedEmail,
            role: normalizedRole
          }
        });
      });
    });
  } catch (error) {
    console.error("Error in POST /auth/login:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;