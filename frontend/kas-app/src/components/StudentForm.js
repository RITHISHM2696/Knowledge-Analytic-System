
import React, {useState} from "react";
import axios from "axios";
import "../styles/StudentForm.css";

export default function StudentForm(){
const [formData, setFormData] = useState({
roll: "",
name: "",
cgpa: "",
att: "",
c: "",
java: "",
python: ""
});

const [errors, setErrors] = useState({});
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);

const validateForm = () => {
const newErrors = {};

if(!formData.roll.trim()) newErrors.roll = "Roll Number is required";
if(!formData.name.trim()) newErrors.name = "Student Name is required";
if(!formData.cgpa || formData.cgpa < 0 || formData.cgpa > 10) 
newErrors.cgpa = "CGPA must be between 0 and 10";
if(!formData.att || formData.att < 0 || formData.att > 100) 
newErrors.att = "Attendance must be between 0 and 100";
if(!formData.c || formData.c < 0 || formData.c > 10) 
newErrors.c = "C Rating must be between 0 and 10";
if(!formData.java || formData.java < 0 || formData.java > 10) 
newErrors.java = "Java Rating must be between 0 and 10";
if(!formData.python || formData.python < 0 || formData.python > 10) 
newErrors.python = "Python Rating must be between 0 and 10";

return newErrors;
};

const handleChange = (e) => {
const {name, value} = e.target;
setFormData({...formData, [name]: value});
setErrors({...errors, [name]: ""});
};

const handleSubmit = async (e) => {
e.preventDefault();
const newErrors = validateForm();

if(Object.keys(newErrors).length > 0){
setErrors(newErrors);
return;
}

setLoading(true);
try{
await axios.post("http://localhost:5000/student/add", formData);
setSuccess("Student added successfully!");
setFormData({
roll: "",
name: "",
cgpa: "",
att: "",
c: "",
java: "",
python: ""
});
setTimeout(() => setSuccess(""), 3000);
} catch(err){
setErrors({form: "Error adding student. Please try again."});
} finally{
setLoading(false);
}
};

return(
<div className="form-container">
{/* Header */}
<div className="form-header">
<h1 className="form-title">
<i className="bi bi-person-plus-fill"></i> Add New Student
</h1>
<p className="form-subtitle">Enter student details and performance metrics</p>
</div>

{/* Form Card */}
<div className="form-card">
{success && (
<div className="alert alert-success alert-dismissible" role="alert">
<i className="bi bi-check-circle-fill"></i> {success}
</div>
)}

{errors.form && (
<div className="alert alert-danger alert-dismissible" role="alert">
<i className="bi bi-exclamation-circle-fill"></i> {errors.form}
</div>
)}

<form onSubmit={handleSubmit}>
{/* Basic Information */}
<div className="form-section">
<h5 className="section-title">Basic Information</h5>
<div className="row">
<div className="col-md-6 mb-3">
<label className="form-label">Roll Number *</label>
<input 
type="text"
className={`form-control ${errors.roll ? "is-invalid" : ""}`}
name="roll"
placeholder="e.g., CS001"
value={formData.roll}
onChange={handleChange}
/>
{errors.roll && <div className="invalid-feedback">{errors.roll}</div>}
</div>

<div className="col-md-6 mb-3">
<label className="form-label">Student Name *</label>
<input 
type="text"
className={`form-control ${errors.name ? "is-invalid" : ""}`}
name="name"
placeholder="Full name"
value={formData.name}
onChange={handleChange}
/>
{errors.name && <div className="invalid-feedback">{errors.name}</div>}
</div>
</div>
</div>

{/* Academic Performance */}
<div className="form-section">
<h5 className="section-title">Academic Performance</h5>
<div className="row">
<div className="col-md-6 mb-3">
<label className="form-label">CGPA (0-10) *</label>
<input 
type="number"
step="0.01"
className={`form-control ${errors.cgpa ? "is-invalid" : ""}`}
name="cgpa"
placeholder="e.g., 8.5"
value={formData.cgpa}
onChange={handleChange}
/>
{errors.cgpa && <div className="invalid-feedback">{errors.cgpa}</div>}
</div>

<div className="col-md-6 mb-3">
<label className="form-label">Attendance (0-100%) *</label>
<input 
type="number"
min="0"
max="100"
className={`form-control ${errors.att ? "is-invalid" : ""}`}
name="att"
placeholder="e.g., 95"
value={formData.att}
onChange={handleChange}
/>
{errors.att && <div className="invalid-feedback">{errors.att}</div>}
</div>
</div>
</div>

{/* Technical Skills */}
<div className="form-section">
<h5 className="section-title">Technical Skills (0-10)</h5>
<div className="row">
<div className="col-md-4 mb-3">
<label className="form-label">C/C++ Rating *</label>
<div className="skill-input-group">
<input 
type="number"
min="0"
max="10"
className={`form-control ${errors.c ? "is-invalid" : ""}`}
name="c"
placeholder="0-10"
value={formData.c}
onChange={handleChange}
/>
<span className="skill-max">/10</span>
</div>
{errors.c && <div className="invalid-feedback d-block">{errors.c}</div>}
</div>

<div className="col-md-4 mb-3">
<label className="form-label">Java Rating *</label>
<div className="skill-input-group">
<input 
type="number"
min="0"
max="10"
className={`form-control ${errors.java ? "is-invalid" : ""}`}
name="java"
placeholder="0-10"
value={formData.java}
onChange={handleChange}
/>
<span className="skill-max">/10</span>
</div>
{errors.java && <div className="invalid-feedback d-block">{errors.java}</div>}
</div>

<div className="col-md-4 mb-3">
<label className="form-label">Python Rating *</label>
<div className="skill-input-group">
<input 
type="number"
min="0"
max="10"
className={`form-control ${errors.python ? "is-invalid" : ""}`}
name="python"
placeholder="0-10"
value={formData.python}
onChange={handleChange}
/>
<span className="skill-max">/10</span>
</div>
{errors.python && <div className="invalid-feedback d-block">{errors.python}</div>}
</div>
</div>
</div>

{/* Submit Button */}
<div className="form-actions">
<button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
{loading ? (
<>
<span className="spinner-border spinner-border-sm me-2" role="status"></span>
Adding...
</>
) : (
<>
<i className="bi bi-check-lg"></i> Add Student
</>
)}
</button>
</div>
</form>

{/* Info Box */}
<div className="form-info">
<i className="bi bi-info-circle"></i>
<p>System will automatically calculate Academic Score, Technical Score, Overall Score and Performance Classification based on the values provided.</p>
</div>
</div>
</div>
);
}