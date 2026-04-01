import React, { useState } from "react";
import axios from "axios";
import "../styles/DeleteStudent.css";

export default function DeleteStudent() {
  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userRole = String(user.role || "").toLowerCase();

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!roll.trim()) {
      setError("Roll number is required");
      return;
    }

    if (userRole !== "teacher") {
      setError("Access denied. Only teacher can delete student records.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:5000/student/${encodeURIComponent(roll.trim())}`,
        {
          headers: {
            "x-user-role": userRole
          }
        }
      );

      setSuccess(response.data?.message || "Student deleted successfully");
      setRoll("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== "teacher") {
    return (
      <div className="delete-container">
        <div className="delete-header">
          <h1 className="delete-title">
            <i className="bi bi-trash-fill"></i> Delete Student
          </h1>
          <p className="delete-subtitle">Remove student record by roll number</p>
        </div>

        <div className="delete-card">
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-shield-lock-fill"></i>
            No access. Only teacher role can delete student records.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="delete-container">
      <div className="delete-header">
        <h1 className="delete-title">
          <i className="bi bi-trash-fill"></i> Delete Student
        </h1>
        <p className="delete-subtitle">Delete student by roll number</p>
      </div>

      <div className="delete-card">
        {success && (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle-fill"></i> {success}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i> {error}
          </div>
        )}

        <form onSubmit={handleDelete}>
          <div className="mb-3">
            <label className="form-label">Roll Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter roll number (e.g., CS001)"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger btn-lg" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash"></i> Delete Student
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
