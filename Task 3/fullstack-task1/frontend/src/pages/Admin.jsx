import React from 'react';
import { useEffect,useState } from "react";
import { api } from "../api";
export default function Admin(){const [users,setUsers]=useState([]),[error,setError]=useState("");
async function load(){try{setUsers((await api("/users")).users)}catch(e){setError(e.message)}} useEffect(()=>{load()},[]);
async function changeRole(id,role){try{await api(`/users/${id}/role`,{method:"PATCH",body:JSON.stringify({role})});load()}catch(e){setError(e.message)}}
return <main className="page"><p className="eyebrow">ADMIN CONTROL CENTER</p><h1>User management</h1><p>Only admins can access this page and API.</p>{error&&<div className="error">{error}</div>}
<div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead><tbody>{users.map(u=><tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td><span className="role small">{u.role}</span></td><td><select value={u.role} onChange={e=>changeRole(u._id,e.target.value)}><option value="user">user</option><option value="admin">admin</option></select></td></tr>)}</tbody></table></div></main>}

