import { eq, or } from "drizzle-orm";
import { createSession, hashPassword, isSecureRequest, sessionCookie, validMutationOrigin, validPassword } from "../../../auth";
import { ensureSchema, getDb } from "../../../../db";
import { users } from "../../../../db/schema";

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await ensureSchema();
  const body = await request.json().catch(() => null) as { name?: string; email?: string; username?: string; password?: string } | null;
  const name = body?.name?.trim().slice(0, 80) ?? "";
  const email = body?.email?.trim().toLowerCase().slice(0, 160) ?? "";
  const username = body?.username?.trim().toLowerCase().slice(0, 32) ?? "";
  const password = body?.password ?? "";
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !/^[a-z0-9._-]{3,32}$/.test(username) || !validPassword(password)) {
    return Response.json({ error: "Enter a valid name, email, username, and a password with 10+ characters, uppercase, lowercase, and a number." }, { status: 400 });
  }
  const db = getDb();
  const existing = await db.select({ id: users.id }).from(users).where(or(eq(users.email, email), eq(users.username, username))).limit(1);
  if (existing.length) return Response.json({ error: "That email or username is already in use." }, { status: 409 });
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, name, email, username, passwordHash: await hashPassword(password), role: "customer" });
  const session = await createSession(id);
  return Response.json({ user: { id, name, email, username, role: "customer" } }, { status: 201, headers: { "Set-Cookie": sessionCookie(session.token, isSecureRequest(request)), "Cache-Control": "no-store" } });
}
