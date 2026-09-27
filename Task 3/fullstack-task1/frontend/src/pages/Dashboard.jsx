import React from 'react';
import { useAuth } from "../context/AuthContext";
export default function Dashboard(){const {user}=useAuth();return <main className="page"><div className="page-head"><div><p className="eyebrow">USER DASHBOARD</p><h1>Hello, {user.name} 👋</h1><p>Your authenticated session is active.</p></div><span className="role">{user.role.toUpperCase()}</span></div>
<div className="grid"><section className="info-card"><h3>Authentication</h3><p>JWT-protected login and registration are working through the Express API.</p></section><section className="info-card"><h3>Database</h3><p>Your account is stored in MongoDB with a bcrypt-hashed password.</p></section><section className="info-card"><h3>Authorization</h3><p>Your current role is <strong>{user.role}</strong>. Admin-only routes are protected on the server.</p></section></div></main>}

