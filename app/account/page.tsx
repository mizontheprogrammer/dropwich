"use client";

import Link from "next/link";
import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";

type User = { name: string; email: string; username: string; role: "customer" | "admin" };

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { fetch("/api/auth/me").then(response => response.json()).then(data => setUser(data.user)).finally(() => setLoading(false)); }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch(`/api/auth/${mode === "signin" ? "login" : "register"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) return setError(data.error ?? "Unable to continue.");
    setUser(data.user);
  };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); };

  return <main className="route account-route"><SiteHeader active="account" /><section className="account-stage">
    <div className="account-brand"><h1>Order faster.<br /><em>Stay connected.</em></h1><p>Sign in to place orders. Administrators can also access the operations dashboard. Passwords are securely hashed, and sessions use protected cookies.</p></div>
    <div className="account-card">
      {loading ? <p>Loading your account…</p> : user ? <div className="signed-in"><span><UserRound /></span><h2>{user.name}</h2><p>@{user.username} · {user.email}</p><b className={`role-badge ${user.role}`}>{user.role === "admin" ? <ShieldCheck /> : <UserRound />}{user.role}</b>{user.role === "admin" && <Link href="/dashboard">Open admin dashboard <ArrowRight /></Link>}<button onClick={logout}><LogOut /> Sign out</button></div> : <><div className="auth-tabs"><button className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button><button className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Create account</button></div><form onSubmit={submit}>{mode === "signup" && <><label>Full name<input name="name" autoComplete="name" required minLength={2} /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Username<input name="username" autoComplete="username" required minLength={3} pattern="[a-zA-Z0-9._-]+" /></label></>}{mode === "signin" && <label>Username or email<input name="login" autoComplete="username" required /></label>}<label>Password<input name="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} required minLength={10} /></label>{mode === "signup" && <small>Use at least 10 characters with uppercase, lowercase, and a number.</small>}{error && <p className="form-error" role="alert">{error}</p>}<button type="submit">{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight /></button></form><Link className="admin-setup-link" href="/admin/setup">First-time administrator setup</Link></>}
    </div>
  </section></main>;
}
