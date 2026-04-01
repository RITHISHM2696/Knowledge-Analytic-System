import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/Home.css";

export default function Home(){
const [stats, setStats] = useState(null);
const [topStudents, setTopStudents] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchStats();
fetchTopStudents();
}, []);

const fetchStats = async () => {
try{
const response = await axios.get("http://localhost:5000/student/stats");
setStats(response.data);
} catch(err){
console.log("Error fetching stats:", err);
}
};

const fetchTopStudents = async () => {
try{
const response = await axios.get("http://localhost:5000/student/top3");
setTopStudents(response.data);
setLoading(false);
} catch(err){
console.log("Error fetching top students:", err);
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

if(loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;

return(
<div className="home-container">
{/* Header */}
<div className="home-header">
<h1 className="home-title">Welcome to Dashboard</h1>
<p className="home-subtitle">Your Knowledge Analytics Overview</p>
</div>

{/* Stats Cards Row */}
{stats && (
<div className="row g-4 mb-5">
<div className="col-md-6 col-lg-3">
<div className="stat-card stat-card-total">
<div className="stat-icon">
<i className="bi bi-people-fill"></i>
</div>
<div className="stat-content">
<h3 className="stat-value">{stats.total}</h3>
<p className="stat-label">Total Students</p>
</div>
</div>
</div>

<div className="col-md-6 col-lg-3">
<div className="stat-card stat-card-excellent">
<div className="stat-icon">
<i className="bi bi-star-fill"></i>
</div>
<div className="stat-content">
<h3 className="stat-value">{stats.excellent}</h3>
<p className="stat-label">Excellent Students</p>
</div>
</div>
</div>

<div className="col-md-6 col-lg-3">
<div className="stat-card stat-card-average">
<div className="stat-icon">
<i className="bi bi-graph-up"></i>
</div>
<div className="stat-content">
<h3 className="stat-value">{stats.average}</h3>
<p className="stat-label">Average Students</p>
</div>
</div>
</div>

<div className="col-md-6 col-lg-3">
<div className="stat-card stat-card-needs">
<div className="stat-icon">
<i className="bi bi-exclamation-triangle-fill"></i>
</div>
<div className="stat-content">
<h3 className="stat-value">{stats.needsImprovement}</h3>
<p className="stat-label">Needs Improvement</p>
</div>
</div>
</div>
</div>
)}

{/* Top Students Section */}
<div className="top-students-section">
<h2 className="section-title">
<i className="bi bi-trophy-fill"></i> Top 3 Performers
</h2>

{topStudents.length > 0 ? (
<div className="row g-4">
{topStudents.map((student, idx) => (
<div key={idx} className="col-md-6 col-lg-4">
<div className="top-student-card">
<div className="rank-badge">#{idx + 1}</div>
<div className="card-body">
<h5 className="student-name">{student.name}</h5>
<p className="student-roll">Roll: {student.roll}</p>

<div className="scores-container">
<div className="score-item">
<span className="score-label">Academic</span>
<span className="score-value">{student.academic.toFixed(2)}</span>
</div>
<div className="score-item">
<span className="score-label">Technical</span>
<span className="score-value">{student.technical.toFixed(2)}</span>
</div>
<div className="score-item">
<span className="score-label">Overall</span>
<div className="overall-score">
{student.overall.toFixed(2)}
</div>
</div>
</div>

<div className="performance-badge" style={{backgroundColor: getPerformanceColor(student.performance)}}>
{student.performance}
</div>
</div>
</div>
</div>
))}
</div>
) : (
<div className="no-data">
<i className="bi bi-inbox"></i>
<p>No students found</p>
</div>
)}
</div>
</div>
);
}
