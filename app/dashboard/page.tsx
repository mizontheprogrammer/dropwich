import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { SiteHeader } from "../components/SiteHeader";
import { ensureSchema } from "../../db";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await ensureSchema();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/account");
  return <main className="route dashboard-route"><SiteHeader active="dashboard" /><AdminDashboard adminName={user.name} /><div className="route-footer"><span>ADMINISTRATOR ACCESS</span><p>Historical finance model and incoming orders.</p><span>04 — DASHBOARD</span></div></main>;
}
