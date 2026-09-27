import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
export default function Register() {
  const [form,setForm]=useState({name:"",email:"",password:""}),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  const {saveAuth}=useAuth(),navigate=useNavigate();
  async function submit(e){e.preventDefault();setBusy(true);setError("");try{const d=await api("/auth/register",{method:"POST",body:JSON.stringify(form)});saveAuth(d);navigate("/dashboard")}catch(e){setError(e.message)}finally{setBusy(false)}}
  return <main className="auth-page"><form className="form-card" onSubmit={submit}><p className="eyebrow">CREATE ACCOUNT</p><h1>Join the app</h1>{error&&<div className="error">{error}</div>}
    <label>Name<input required minLength="2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Password<input type="password" required minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
    <button className="btn primary full" disabled={busy}>{busy?"Creating...":"Create account"}</button>
    <p className="form-footer">Already registered? <Link to="/login">Login</Link></p>
  </form></main>;
}

