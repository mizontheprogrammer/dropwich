import { clearSessionCookie, hashToken, isSecureRequest, SESSION_COOKIE, validMutationOrigin } from "../../../auth";
import { ensureSchema, getD1 } from "../../../../db";

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await ensureSchema();
  const cookie = request.headers.get("cookie")?.split(";").map(value => value.trim()).find(value => value.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  if (cookie) await getD1().prepare("DELETE FROM sessions WHERE id = ?").bind(await hashToken(cookie)).run();
  return Response.json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie(isSecureRequest(request)), "Cache-Control": "no-store" } });
}
