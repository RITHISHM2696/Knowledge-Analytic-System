
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login(){
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

async function handleLogin(){
if(!email || !password || !role){
setError("Please fill all fields");
return;
}
try {
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await fetch(`${apiUrl}/auth/login`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email, password, role })
});

const data = await response.json();

if (!response.ok) {
setError(data.error || "Login failed");
return;
}

localStorage.setItem("user", JSON.stringify(data.user));
navigate("/dash");
setError("");
} catch (err) {
setError("Unable to connect to server");
}
}

const handleKeyPress = (e) => {
if(e.key === "Enter") handleLogin();
};

return(
<div className="login-container">
<div className="login-card">
<div className="text-center mb-4">
<h1 className="login-title">
<i className="bi bi-graph-up"></i> KAS
</h1>
<p className="login-subtitle">Knowledge Analytics System</p>
</div>

<div className="login-form">
<div className="mb-3">
<label className="form-label">Email Address</label>
<input 
type="email"
className="form-control" 
placeholder="Enter Email-Id" 
value={email}
onChange={(e)=>setEmail(e.target.value)}
onKeyPress={handleKeyPress}
/>
</div>

<div className="mb-3">
<label className="form-label">Password</label>
<input 
type="password"
className="form-control" 
placeholder="Enter Password" 
value={password}
onChange={(e)=>setPassword(e.target.value)}
onKeyPress={handleKeyPress}
/>
</div>

<div className="mb-3">
<label className="form-label">Role</label>
<select
className="form-control"
value={role}
onChange={(e)=>setRole(e.target.value)}
>
<option value="">Select role</option>
<option value="student">Student</option>
<option value="teacher">Teacher</option>
</select>
</div>

{error && <div className="alert alert-danger alert-sm"><i className="bi bi-exclamation-circle-fill"></i> {error}</div>}

<button className="btn btn-primary btn-lg login-submit-btn" onClick={handleLogin}>
<i className="bi bi-lock"></i> Sign In
</button>

</div>
</div>
</div>
);
}
