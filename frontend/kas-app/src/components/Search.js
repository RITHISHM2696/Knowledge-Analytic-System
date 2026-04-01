
import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/Search.css";

export default function Search({searchQuery = ""}){
const [rollNo, setRollNo] = useState(searchQuery);
const [student, setStudent] = useState(null);
const [error, setError] = useState("");
const [searched, setSearched] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
if(searchQuery){
setRollNo(searchQuery);
setError("");
}
}, [searchQuery]);

const handleSearch = async (e) => {
e.preventDefault();

if(!rollNo.trim()){
setError("Please enter a roll number");
return;
}

setLoading(true);
setError("");
setStudent(null);
setSearched(true);

try{
const response = await axios.get(`http://localhost:5000/student/${rollNo}`);
if(response.data && response.data.length > 0){
setStudent(response.data[0]);
} else {
setError("Student not found");
}
} catch(err){
setError("Error searching student. Please try again.");
} finally{
setLoading(false);
}
};

const getPerformanceColor = (performance) => {
switch(performance){
case "Excellent": return "#10B981";
case "Good": return "#3B82F6";
case "Average": return "#F59E0B";
case "Needs Improvement": return "#EF4444";
default: return "#6B7280";
}
};

const getPerformanceIcon = (performance) => {
switch(performance){
case "Excellent": return "star-fill";
case "Good": return "hand-thumbs-up-fill";
case "Average": return "graph-up";
case "Needs Improvement": return "exclamation-triangle-fill";
default: return "question-circle";
}
};

const handleKeyPress = (e) => {
if(e.key === "Enter") handleSearch(e);
};

return(
<div className="search-container">
{/* Header */}
<div className="search-header">
<h1 className="search-title">
<i className="bi bi-search"></i> Search Student
</h1>
<p className="search-subtitle">Find student by roll number</p>
</div>

{/* Search Bar */}
<div className="search-form-container">
<form onSubmit={handleSearch} className="search-form">
<div className="search-input-wrapper">
<input 
type="text"
className="search-input"
placeholder="Enter Roll Number (e.g., CS001)"
value={rollNo}
onChange={(e) => setRollNo(e.target.value)}
onKeyPress={handleKeyPress}
/>
<button type="submit" className="search-btn" disabled={loading}>
{loading ? (
<span className="spinner-border spinner-border-sm"></span>
) : (
<i className="bi bi-search"></i>
)}
</button>
</div>
</form>
</div>

{/* Error Message */}
{error && (
<div className="alert alert-danger alert-dismissible" role="alert">
<i className="bi bi-exclamation-circle-fill"></i> {error}
</div>
)}

{/* Result */}
{!loading && searched && student && (
<div className="search-result">
<div className="result-card">
<div className="result-header">
<h2 className="student-name">{student.name}</h2>
<span className="student-roll-badge">{student.roll}</span>
</div>

<div className="row mt-4">
{/* Academic & Technical Scores */}
<div className="col-md-6 mb-4">
<div className="score-box academic-box">
<h6 className="score-box-title">
<i className="bi bi-book-fill"></i> Academic Score
</h6>
<div className="score-display">{student.academic.toFixed(2)}</div>
<p className="score-components">CGPA: {student.cgpa} | Attendance: {student.att}%</p>
</div>
</div>

<div className="col-md-6 mb-4">
<div className="score-box technical-box">
<h6 className="score-box-title">
<i className="bi bi-code-square"></i> Technical Score
</h6>
<div className="score-display">{student.technical.toFixed(2)}</div>
<p className="score-components">
C: {student.c} | Java: {student.java} | Python: {student.python}
</p>
</div>
</div>
</div>

{/* Overall Score & Performance */}
<div className="row">
<div className="col-md-6 mb-4">
<div className="overall-score-box">
<h6 className="score-box-title">Overall Score</h6>
<div className="overall-display">{student.overall.toFixed(2)}</div>
<div className="progress mt-3" style={{height: "8px"}}>
<div 
className="progress-bar" 
style={{
width: `${(student.overall / 100) * 100}%`,
backgroundColor: getPerformanceColor(student.performance)
}}
></div>
</div>
</div>
</div>

<div className="col-md-6 mb-4">
<div className="performance-box" style={{borderLeftColor: getPerformanceColor(student.performance)}}>
<h6 className="score-box-title">Performance Classification</h6>
<div className="performance-badge" style={{backgroundColor: getPerformanceColor(student.performance)}}>
<i className={`bi bi-${getPerformanceIcon(student.performance)}`}></i>
{student.performance}
</div>
</div>
</div>
</div>

{/* Detailed Breakdown */}
<div className="detailed-breakdown mt-5">
<h6 className="breakdown-title">Detailed Breakdown</h6>
<div className="breakdown-grid">
<div className="breakdown-item">
<span className="breakdown-label">CGPA</span>
<span className="breakdown-value">{student.cgpa}</span>
</div>
<div className="breakdown-item">
<span className="breakdown-label">Attendance</span>
<span className="breakdown-value">{student.att}%</span>
</div>
<div className="breakdown-item">
<span className="breakdown-label">C/C++</span>
<span className="breakdown-value">{student.c}/10</span>
</div>
<div className="breakdown-item">
<span className="breakdown-label">Java</span>
<span className="breakdown-value">{student.java}/10</span>
</div>
<div className="breakdown-item">
<span className="breakdown-label">Python</span>
<span className="breakdown-value">{student.python}/10</span>
</div>
</div>
</div>
</div>
</div>
)}

{/* Loading State */}
{loading && (
<div className="text-center p-5">
<div className="spinner-border" role="status"></div>
</div>
)}

{/* No Result */}
{!loading && searched && !student && !error && (
<div className="no-result">
<i className="bi bi-inbox"></i>
<p>No student found with this roll number</p>
</div>
)}

{/* Initial State */}
{!searched && (
<div className="initial-state">
<i className="bi bi-search"></i>
<p>Enter a roll number above to search for a student</p>
</div>
)}
</div>
);
}