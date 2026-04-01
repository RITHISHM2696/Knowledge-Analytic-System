import React, {useState, useEffect} from "react";
import "../styles/Profile.css";

export default function Profile(){
const [user, setUser] = useState(null);

useEffect(() => {
const userEmail = localStorage.getItem("user") || "admin@gmail.com";
setUser(userEmail);
}, []);

return(
<div className="profile-container">
{/* Header */}
<div className="profile-header">
<h1 className="profile-title">
<i className="bi bi-person-circle"></i> User Profile
</h1>
<p className="profile-subtitle">Manage your account settings</p>
</div>

{/* Profile Card */}
<div className="profile-card">
<div className="profile-avatar">
<i className="bi bi-person-fill"></i>
</div>

<div className="profile-info">
<h2>Administrator</h2>
<p className="profile-email">
<i className="bi bi-envelope-fill"></i> {user}
</p>
</div>

{/* Profile Details */}
<div className="profile-details">
<div className="detail-row">
<span className="detail-label">Account Type</span>
<span className="detail-value">
<i className="bi bi-shield-check"></i> System Administrator
</span>
</div>
<div className="detail-row">
<span className="detail-label">Status</span>
<span className="detail-value">
<i className="bi bi-check-circle-fill" style={{color: "#10B981"}}></i> Active
</span>
</div>
<div className="detail-row">
<span className="detail-label">Permissions</span>
<span className="detail-value">
<i className="bi bi-key-fill"></i> Full Access
</span>
</div>
<div className="detail-row">
<span className="detail-label">Last Login</span>
<span className="detail-value">
<i className="bi bi-clock-fill"></i> Just now
</span>
</div>
</div>
</div>

{/* System Info */}
<div className="system-info">
<h5 className="info-title">Knowledge Analytics System</h5>
<div className="info-grid">
<div className="info-item">
<h6>Version</h6>
<p>1.0.0</p>
</div>
<div className="info-item">
<h6>Database</h6>
<p>MySQL</p>
</div>
<div className="info-item">
<h6>Frontend</h6>
<p>React 18.2</p>
</div>
<div className="info-item">
<h6>Backend</h6>
<p>Node.js + Express</p>
</div>
</div>
</div>

{/* Features */}
<div className="features-section">
<h5 className="features-title">Available Features</h5>
<ul className="features-list">
<li><i className="bi bi-check-lg"></i> Student Management</li>
<li><i className="bi bi-check-lg"></i> Performance Analytics</li>
<li><i className="bi bi-check-lg"></i> Student Search</li>
<li><i className="bi bi-check-lg"></i> Performance Classification</li>
<li><i className="bi bi-check-lg"></i> Top Performers Tracking</li>
<li><i className="bi bi-check-lg"></i> Statistical Dashboard</li>
</ul>
</div>

{/* About */}
<div className="about-section">
<h5 className="about-title">About KAS</h5>
<p className="about-text">
The Knowledge Analytics System (KAS) is a comprehensive web-based platform designed to manage, 
analyze, and track student performance. It combines academic metrics with technical skill assessments 
to provide a holistic view of student knowledge and abilities.
</p>
<p className="about-text">
The system automatically calculates performance scores and classifies students into performance 
categories to help educators identify students who need additional support and recognize top performers.
</p>
</div>
</div>
);
}
