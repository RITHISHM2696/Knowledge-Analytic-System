
const express = require("express");
const router = express.Router();
const db = require("../db");

// Validation helper
const validateStudentInput = (roll, name, cgpa, att, c, java, python) => {
  const errors = [];
  
  if (!roll || roll.trim() === "") errors.push("Roll number is required");
  if (!name || name.trim() === "") errors.push("Name is required");
  if (cgpa === "" || cgpa === null || isNaN(cgpa) || cgpa < 0 || cgpa > 10) 
    errors.push("CGPA must be between 0 and 10");
  if (att === "" || att === null || isNaN(att) || att < 0 || att > 100) 
    errors.push("Attendance must be between 0 and 100");
  if (c === "" || c === null || isNaN(c) || c < 0 || c > 10) 
    errors.push("C rating must be between 0 and 10");
  if (java === "" || java === null || isNaN(java) || java < 0 || java > 10) 
    errors.push("Java rating must be between 0 and 10");
  if (python === "" || python === null || isNaN(python) || python < 0 || python > 10) 
    errors.push("Python rating must be between 0 and 10");
  
  return errors;
};

// Calculate scores
const calculateScores = (cgpa, att, c, java, python) => {
  const academic = (parseFloat(cgpa) * 10 + parseInt(att)) / 2;
  const technical = (parseInt(c) + parseInt(java) + parseInt(python)) / 3 * 10;
  const overall = (academic + technical) / 2;
  
  let performance = "Average";
  if (overall >= 80) performance = "Excellent";
  else if (overall >= 60) performance = "Good";
  else if (overall < 40) performance = "Needs Improvement";
  
  return {
    academic: parseFloat(academic.toFixed(2)),
    technical: parseFloat(technical.toFixed(2)),
    overall: parseFloat(overall.toFixed(2)),
    performance
  };
};

const normalizeStudentScores = (student) => {
  const scores = calculateScores(student.cgpa, student.att, student.c, student.java, student.python);
  return {
    ...student,
    ...scores
  };
};

// POST - Add student
router.post("/add", (req, res) => {
  try {
    const { roll, name, cgpa, att, c, java, python } = req.body;
    
    // Validate input
    const errors = validateStudentInput(roll, name, cgpa, att, c, java, python);
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: errors 
      });
    }
    
    // Calculate scores
    const scores = calculateScores(cgpa, att, c, java, python);
    
    // Insert into database
    const query = "INSERT INTO students (roll, name, cgpa, att, c, java, python, academic, technical, overall, performance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      roll.trim(),
      name.trim(),
      parseFloat(cgpa),
      parseInt(att),
      parseInt(c),
      parseInt(java),
      parseInt(python),
      scores.academic,
      scores.technical,
      scores.overall,
      scores.performance
    ];
    
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Student with this roll number already exists" });
        }
        return res.status(500).json({ error: "Failed to add student" });
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Student added successfully",
        student: {
          roll,
          name,
          ...scores
        }
      });
    });
  } catch (error) {
    console.error("Error in POST /add:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Get all students
router.get("/all", (req, res) => {
  try {
    const query = "SELECT * FROM students ORDER BY roll ASC";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to fetch students" });
      }
      
      const normalizedStudents = (results || []).map(normalizeStudentScores);
      res.status(200).json(normalizedStudents);
    });
  } catch (error) {
    console.error("Error in GET /all:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Get top 3 students
router.get("/top3", (req, res) => {
  try {
    const query = "SELECT * FROM students";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to fetch top students" });
      }
      
      const normalizedTop3 = (results || [])
        .map(normalizeStudentScores)
        .sort((a, b) => b.overall - a.overall)
        .slice(0, 3);

      res.status(200).json(normalizedTop3);
    });
  } catch (error) {
    console.error("Error in GET /top3:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Get statistics
router.get("/stats", (req, res) => {
  try {
    const query = "SELECT cgpa, att, c, java, python FROM students";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to fetch statistics" });
      }

      const stats = {
        total: 0,
        excellent: 0,
        good: 0,
        average: 0,
        needsImprovement: 0
      };

      (results || []).forEach((student) => {
        const { performance } = calculateScores(student.cgpa, student.att, student.c, student.java, student.python);
        stats.total += 1;

        if (performance === "Excellent") stats.excellent += 1;
        else if (performance === "Good") stats.good += 1;
        else if (performance === "Average") stats.average += 1;
        else stats.needsImprovement += 1;
      });

      res.status(200).json({
        total: stats.total,
        excellent: stats.excellent,
        good: stats.good,
        average: stats.average,
        needsImprovement: stats.needsImprovement
      });
    });
  } catch (error) {
    console.error("Error in GET /stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE - Delete student by roll number (teacher only)
router.delete("/:roll", (req, res) => {
  try {
    const { roll } = req.params;
    const userRole = String(req.headers["x-user-role"] || "").toLowerCase().trim();

    if (userRole !== "teacher") {
      return res.status(403).json({ error: "Access denied. Only teacher can delete students" });
    }

    if (!roll || roll.trim() === "") {
      return res.status(400).json({ error: "Roll number is required" });
    }

    const query = "DELETE FROM students WHERE roll = ?";

    db.query(query, [roll.trim()], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to delete student" });
      }

      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json({
        success: true,
        message: `Student with roll ${roll.trim()} deleted successfully`
      });
    });
  } catch (error) {
    console.error("Error in DELETE /:roll:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET - Search student by roll number
router.get("/:roll", (req, res) => {
  try {
    const { roll } = req.params;

    if (!roll || roll.trim() === "") {
      return res.status(400).json({ error: "Roll number is required" });
    }

    const query = "SELECT * FROM students WHERE roll = ?";

    db.query(query, [roll.trim()], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to search student" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json([normalizeStudentScores(results[0])]);
    });
  } catch (error) {
    console.error("Error in GET /:roll:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
