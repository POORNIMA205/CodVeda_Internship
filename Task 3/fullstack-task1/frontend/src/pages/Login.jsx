import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [form,setForm]=useState({email:"",password:""}),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  const {saveAuth}=useAuth(),navigate=useNavigate();
  async function submit(e){e.preventDefault();setBusy(true);setError("");try{const d=await api("/auth/login",{method:"POST",body:JSON.stringify(form)});saveAuth(d);navigate("/dashboard")}catch(e){setError(e.message)}finally{setBusy(false)}}
  return <main className="auth-page"><form className="form-card" onSubmit={submit}><p className="eyebrow">ACCOUNT ACCESS</p><h1>Welcome back</h1>{error&&<div className="error">{error}</div>}
    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
    <button className="btn primary full" disabled={busy}>{busy?"Signing in...":"Login"}</button>
    <p className="form-footer">New here? <Link to="/register">Create an account</Link></p>
  </form></main>;
}

