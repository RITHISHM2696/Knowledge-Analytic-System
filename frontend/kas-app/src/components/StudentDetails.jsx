import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/StudentDetails.css";

export default function StudentDetails(){
const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);
const [searchRoll, setSearchRoll] = useState("");

useEffect(() => {
fetchStudents();
}, []);

const fetchStudents = async () => {
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
try{
const response = await axios.get(`${apiUrl}/student/all`);
setStudents(response.data);
setLoading(false);
} catch(err){
console.log("Error fetching students:", err);
setLoading(false);
}
};

const getPerformanceClass = (performance) => {
switch(performance){
case "Excellent": return "badge-success";
case "Good": return "badge-info";
case "Average": return "badge-warning";
case "Needs Improvement": return "badge-danger";
default: return "badge-secondary";
}
};

const filteredStudents = searchRoll.trim() === "" 
? students 
: students.filter(s => s.roll.toLowerCase().includes(searchRoll.toLowerCase()));

if(loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;

return(
<div className="details-container">
{/* Header */}
<div className="details-header">
<h1 className="details-title">Student Details</h1>
<p className="details-subtitle">View all student information and performance metrics</p>
</div>

{/* Search Bar */}
<div className="search-bar-container">
<div className="search-input-group">
<i className="bi bi-search"></i>
<input 
type="text"
className="form-control search-input"
placeholder="Search by Roll Number..."
value={searchRoll}
onChange={(e) => setSearchRoll(e.target.value)}
/>
</div>
<p className="result-count">Found {filteredStudents.length} student(s)</p>
</div>

{/* Table Container */}
{filteredStudents.length > 0 ? (
<div className="table-responsive-custom">
<table className="table table-hover details-table">
<thead>
<tr>
<th>Roll No</th>
<th>Name</th>
<th>CGPA</th>
<th>Attendance %</th>
<th>C/C++</th>
<th>Java</th>
<th>Python</th>
<th>Academic</th>
<th>Technical</th>
<th>Overall</th>
<th>Performance</th>
</tr>
</thead>
<tbody>
{filteredStudents.map((student, idx) => (
<tr key={idx}>
<td className="fw-bold">{student.roll}</td>
<td>{student.name}</td>
<td>{student.cgpa.toFixed(2)}</td>
<td>{student.att}%</td>
<td>
<span className="rating-badge">{student.c}/10</span>
</td>
<td>
<span className="rating-badge">{student.java}/10</span>
</td>
<td>
<span className="rating-badge">{student.python}/10</span>
</td>
<td>{student.academic.toFixed(2)}</td>
<td>{student.technical.toFixed(2)}</td>
<td className="fw-bold">{student.overall.toFixed(2)}</td>
<td>
<span className={`badge ${getPerformanceClass(student.performance)}`}>
{student.performance}
</span>
</td>
</tr>
))}
</tbody>
</table>
</div>
) : (
<div className="no-data-container">
<div className="no-data">
<i className="bi bi-inbox"></i>
<h5>No Students Found</h5>
<p>Add students to view their details here</p>
</div>
</div>
)}
</div>
);
}
