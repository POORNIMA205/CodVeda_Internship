import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar"; import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home"; import Login from "./pages/Login"; import Register from "./pages/Register"; import Dashboard from "./pages/Dashboard"; import Admin from "./pages/Admin";
export default function App(){return <BrowserRouter><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<Dashboard/>}/></Route><Route element={<ProtectedRoute adminOnly/>}><Route path="/admin" element={<Admin/>}/></Route></Routes></BrowserRouter>}
