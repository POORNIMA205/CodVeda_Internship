import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; } });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("token")) return setLoading(false);
    api("/auth/me").then(d => setUser(d.user)).catch(() => logout()).finally(() => setLoading(false));
  }, []);
  function saveAuth(d) { localStorage.setItem("token", d.token); localStorage.setItem("user", JSON.stringify(d.user)); setUser(d.user); }
  function logout() { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); }
  return <AuthContext.Provider value={{ user, loading, saveAuth, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
