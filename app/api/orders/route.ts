import { desc, eq } from "drizzle-orm";
import { getCurrentUser, validMutationOrigin } from "../../auth";
import { ensureSchema, getDb } from "../../../db";
import { orderItems, orders, users } from "../../../db/schema";
import { products } from "../../data";

const sauces = new Set(["Ketchup", "Mayo", "Ketchup + Mayo", "No sauce", "Extra house sauce"]);

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await ensureSchema();
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Sign in before placing an order." }, { status: 401 });
  const body = await request.json().catch(() => null) as { items?: Array<{ productId?: string; quantity?: number; sauce?: string; notes?: string }> } | null;
  if (!body?.items?.length || body.items.length > 20) return Response.json({ error: "Your order is empty or too large." }, { status: 400 });
  let totalCentavos = 0;
  const cleanItems = [];
  for (const raw of body.items) {
    const product = products.find(item => item.id === raw.productId);
    const quantity = Number(raw.quantity);
    const sauce = raw.sauce ?? "Ketchup + Mayo";
    const notes = raw.notes?.trim().slice(0, 160) ?? "";
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || !sauces.has(sauce)) return Response.json({ error: "One or more order items are invalid." }, { status: 400 });
    totalCentavos += product.price * 100 * quantity;
    cleanItems.push({ product, quantity, sauce, notes });
  }
  const orderId = crypto.randomUUID();
  const db = getDb();
  await db.insert(orders).values({ id: orderId, userId: user.id, totalCentavos, status: "new" });
  await db.insert(orderItems).values(cleanItems.map(item => ({ id: crypto.randomUUID(), orderId, productId: item.product.id, productName: item.product.label, quantity: item.quantity, unitPriceCentavos: item.product.price * 100, sauce: item.sauce, notes: item.notes })));
  return Response.json({ order: { id: orderId, total: totalCentavos / 100, status: "new" } }, { status: 201, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  await ensureSchema();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return Response.json({ error: "Administrator access required." }, { status: 403 });
  const rows = await getDb().select({ id: orders.id, customer: users.name, totalCentavos: orders.totalCentavos, status: orders.status, createdAt: orders.createdAt }).from(orders).innerJoin(users, eq(orders.userId, users.id)).orderBy(desc(orders.createdAt)).limit(25);
  return Response.json({ orders: rows }, { headers: { "Cache-Control": "no-store" } });
}
