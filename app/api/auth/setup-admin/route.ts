import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { createSession, hashPassword, isSecureRequest, sessionCookie, validMutationOrigin, validPassword } from "../../../auth";
import { ensureSchema, getDb } from "../../../../db";
import { users } from "../../../../db/schema";

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await ensureSchema();
  const body = await request.json().catch(() => null) as { name?: string; username?: string; email?: string; password?: string; setupKey?: string } | null;
  const configuredKey = (env as unknown as { ADMIN_SETUP_KEY?: string }).ADMIN_SETUP_KEY;
  const hostname = new URL(request.url).hostname;
  const localSetup = hostname === "localhost" || hostname === "127.0.0.1";
  if (!localSetup && (!configuredKey || !body?.setupKey || body.setupKey !== configuredKey)) return Response.json({ error: "The admin setup key is invalid or not configured." }, { status: 403 });
  const db = getDb();
  if ((await db.select({ id: users.id }).from(users).where(eq(users.role, "admin")).limit(1)).length) return Response.json({ error: "An administrator already exists." }, { status: 409 });
  const name = body.name?.trim().slice(0, 80) ?? "";
  const username = body.username?.trim().toLowerCase().slice(0, 32) ?? "";
  const email = body.email?.trim().toLowerCase().slice(0, 160) ?? "";
  const password = body.password ?? "";
  if (name.length < 2 || !/^[a-z0-9._-]{3,32}$/.test(username) || !/^\S+@\S+\.\S+$/.test(email) || !validPassword(password)) return Response.json({ error: "Enter valid admin details and a strong password." }, { status: 400 });
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, name, username, email, passwordHash: await hashPassword(password), role: "admin" });
  const session = await createSession(id);
  return Response.json({ user: { id, name, username, email, role: "admin" } }, { status: 201, headers: { "Set-Cookie": sessionCookie(session.token, isSecureRequest(request)), "Cache-Control": "no-store" } });
}
