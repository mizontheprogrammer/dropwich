import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export function getD1() {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  return env.DB;
}

export async function ensureSchema() {
  const d1 = getD1();
  await d1.batch([
    d1.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, username TEXT NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'customer', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users(email)"),
    d1.prepare("CREATE UNIQUE INDEX IF NOT EXISTS users_username_idx ON users(username)"),
    d1.prepare("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    d1.prepare("CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL REFERENCES users(id), total_centavos INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    d1.prepare("CREATE TABLE IF NOT EXISTS order_items (id TEXT PRIMARY KEY NOT NULL, order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, product_id TEXT NOT NULL, product_name TEXT NOT NULL, quantity INTEGER NOT NULL, unit_price_centavos INTEGER NOT NULL, sauce TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '')"),
    d1.prepare("CREATE TABLE IF NOT EXISTS auth_rate_limits (key TEXT PRIMARY KEY NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, reset_at INTEGER NOT NULL)"),
  ]);
}
