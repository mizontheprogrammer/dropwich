"use client";

import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "../../components/SiteHeader";

export default function AdminSetupPage() {
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    const response = await fetch("/api/auth/setup-admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())) });
    const data = await response.json();
    if (!response.ok) return setError(data.error ?? "Unable to create administrator.");
    setComplete(true);
  };
  return <main className="route setup-route"><SiteHeader active="account" /><section className="setup-stage"><div className="setup-copy"><ShieldCheck /><p className="micro-label"><span /> ONE-TIME SETUP</p><h1>Create the first administrator.</h1><p>Choose your own administrator username and password. Local setup needs no key; deployed setup requires a server-only key. After an administrator exists, this form cannot create another one.</p></div><div className="setup-card">{complete ? <div className="setup-complete"><ShieldCheck /><h2>Administrator created.</h2><p>Your password was hashed and you are signed in.</p><a href="/dashboard">Open dashboard <ArrowRight /></a></div> : <form onSubmit={submit}><label>Setup key <small>Deployed site only</small><div><KeyRound /><input name="setupKey" type="password" autoComplete="off" /></div></label><small>Leave this blank on localhost.</small><label>Full name<input name="name" autoComplete="name" required /></label><label>Admin email<input name="email" type="email" autoComplete="email" required /></label><label>Admin username<input name="username" autoComplete="username" required pattern="[a-zA-Z0-9._-]+" minLength={3} /></label><label>Create password<input name="password" type="password" autoComplete="new-password" required minLength={10} /></label><small>10+ characters with uppercase, lowercase, and a number.</small>{error && <p className="form-error" role="alert">{error}</p>}<button>Create administrator <ArrowRight /></button></form>}</div></section></main>;
}
