import { getD1 } from "../../../db";

export async function checkLoginRateLimit(key: string) {
  const d1 = getD1();
  const now = Math.floor(Date.now() / 1000);
  const windowSeconds = 15 * 60;
  const row = await d1.prepare("SELECT attempts, reset_at AS resetAt FROM auth_rate_limits WHERE key = ?").bind(key).first<{ attempts: number; resetAt: number }>();
  if (!row || row.resetAt <= now) {
    await d1.prepare("INSERT INTO auth_rate_limits (key, attempts, reset_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = 1, reset_at = excluded.reset_at").bind(key, now + windowSeconds).run();
    return true;
  }
  if (row.attempts >= 5) return false;
  await d1.prepare("UPDATE auth_rate_limits SET attempts = attempts + 1 WHERE key = ?").bind(key).run();
  return true;
}

export async function clearLoginRateLimit(key: string) {
  await getD1().prepare("DELETE FROM auth_rate_limits WHERE key = ?").bind(key).run();
}
