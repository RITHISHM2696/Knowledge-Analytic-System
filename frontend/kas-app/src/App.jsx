
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Home from "./components/Home.jsx";
import StudentForm from "./components/StudentForm.jsx";
import Search from "./components/Search.jsx";
import StudentDetails from "./components/StudentDetails.jsx";
import Profile from "./components/Profile.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App(){
return(
<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/dash" element={<Dashboard/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/form" element={<StudentForm/>}/>
<Route path="/search" element={<Search/>}/>
<Route path="/details" element={<StudentDetails/>}/>
<Route path="/profile" element={<Profile/>}/>
</Routes>
</BrowserRouter>
);}
