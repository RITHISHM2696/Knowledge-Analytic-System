
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import StudentForm from "./components/StudentForm";
import Search from "./components/Search";
import StudentDetails from "./components/StudentDetails";
import Profile from "./components/Profile";
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
