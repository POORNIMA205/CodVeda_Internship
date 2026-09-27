import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Home() {
  const { user } = useAuth();
  return <main className="hero"><div className="hero-card">
    <p className="eyebrow">FULL-STACK TASK 1</p>
    <h1>Secure. Integrated.<br/><span>Production-ready.</span></h1>
    <p className="hero-text">A complete React, Express and MongoDB application with JWT authentication, role-based authorization and optimized API integration.</p>
    <div className="actions"><Link className="btn primary" to={user ? "/dashboard" : "/register"}>{user ? "Open Dashboard" : "Get Started"}</Link>{!user && <Link className="btn secondary" to="/login">Login</Link>}</div>
  </div></main>;
}

