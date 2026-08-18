import { getCurrentUser } from "../../../auth";
import { ensureSchema } from "../../../../db";

export async function GET() {
  await ensureSchema();
  return Response.json({ user: await getCurrentUser() }, { headers: { "Cache-Control": "no-store" } });
}
