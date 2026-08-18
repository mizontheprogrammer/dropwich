import { eq, or } from "drizzle-orm";
import { createSession, isSecureRequest, sessionCookie, validMutationOrigin, verifyPassword } from "../../../auth";
import { ensureSchema, getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { checkLoginRateLimit, clearLoginRateLimit } from "../rate-limit";

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await ensureSchema();
  const body = await request.json().catch(() => null) as { login?: string; password?: string } | null;
  const login = body?.login?.trim().toLowerCase().slice(0, 160) ?? "";
  const password = body?.password ?? "";
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const rateKey = `${ip}:${login}`;
  if (!(await checkLoginRateLimit(rateKey))) return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const [user] = await getDb().select().from(users).where(or(eq(users.username, login), eq(users.email, login))).limit(1);
  if (!user || !(await verifyPassword(password, user.passwordHash))) return Response.json({ error: "Incorrect username/email or password." }, { status: 401 });
  await clearLoginRateLimit(rateKey);
  const session = await createSession(user.id);
  return Response.json({ user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role } }, { headers: { "Set-Cookie": sessionCookie(session.token, isSecureRequest(request)), "Cache-Control": "no-store" } });
}
