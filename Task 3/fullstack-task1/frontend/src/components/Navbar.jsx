import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  function signOut() { logout(); navigate("/login"); }
  return <nav className="nav">
    <Link className="brand" to="/">FullStack<span>App</span></Link>
    <div className="nav-links">{user ? <>
      <Link to="/dashboard">Dashboard</Link>{user.role === "admin" && <Link to="/admin">Admin</Link>}
      <button className="link-btn" onClick={signOut}>Logout</button>
    </> : <><Link to="/login">Login</Link><Link className="nav-cta" to="/register">Register</Link></>}</div>
  </nav>;
}

