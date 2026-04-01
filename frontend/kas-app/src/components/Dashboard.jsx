
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Home from "./Home";
import StudentDetails from "./StudentDetails";
import StudentForm from "./StudentForm";
import DeleteStudent from "./DeleteStudent";
import Search from "./Search";
import Profile from "./Profile";
import "../styles/Dashboard.css";

export default function Dashboard(){
const [activeTab, setActiveTab] = useState("home");
const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user")) || { email: "User" };

const handleLogout = () => {
localStorage.removeItem("user");
navigate("/");
};

const handleQuickSearch = (e) => {
e.preventDefault();
if(searchQuery.trim()){
setActiveTab("search");
}
};

const renderContent = () => {
switch(activeTab){
case "home":
return <Home/>;
case "details":
return <StudentDetails/>;
case "add":
return <StudentForm/>;
case "delete":
return <DeleteStudent/>;
case "search":
return <Search searchQuery={searchQuery}/>;
case "profile":
return <Profile/>;
default:
return <Home/>;
}
};

return(
<div className="dashboard-container">
{/* Sidebar */}
<nav className="sidebar">
<div className="sidebar-header">
<h3 className="sidebar-title">
<i className="bi bi-graph-up"></i> KAS
</h3>
<p className="sidebar-subtitle">Knowledge Analytics</p>
</div>

<div className="sidebar-menu">
<button 
className={`sidebar-link ${activeTab === "home" ? "active" : ""}`}
onClick={() => setActiveTab("home")}
>
<i className="bi bi-house-fill"></i> Home
</button>

<button 
className={`sidebar-link ${activeTab === "profile" ? "active" : ""}`}
onClick={() => setActiveTab("profile")}
>
<i className="bi bi-person-fill"></i> User Profile
</button>

<button 
className={`sidebar-link ${activeTab === "details" ? "active" : ""}`}
onClick={() => setActiveTab("details")}
>
<i className="bi bi-table"></i> Students Record
</button>

<button 
className={`sidebar-link ${activeTab === "add" ? "active" : ""}`}
onClick={() => setActiveTab("add")}
>
<i className="bi bi-plus-circle-fill"></i> Add Student
</button>

<button 
className={`sidebar-link ${activeTab === "delete" ? "active" : ""}`}
onClick={() => setActiveTab("delete")}
>
<i className="bi bi-trash-fill"></i> Delete Student
</button>
</div>
</nav>

{/* Main Content */}
<div className="dashboard-content">
{/* Top Header */}
<div className="dashboard-header">
<div className="header-left">
<h2>Knowledge Analytics System</h2>
</div>
<div className="header-right">
<form className="search-form" onSubmit={handleQuickSearch}>
<input 
type="text"
placeholder="Search students by roll..."
className="search-input"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<button type="submit" className="search-btn">
<i className="bi bi-search"></i>
</button>
</form>

<div className="header-user">
<span className="user-email">{user.email}</span>
</div>

<button 
className="logout-btn-header"
onClick={handleLogout}
title="Logout"
>
<i className="bi bi-box-arrow-right"></i> Logout
</button>
</div>
</div>

<div className="content-area">
{renderContent()}
</div>
</div>
</div>
);
}
