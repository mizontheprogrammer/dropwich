"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CheckCheck,
  ChefHat,
  CircleCheck,
  Clock3,
  PhilippinePeso,
  ReceiptText,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatPeso, products, ProductId } from "../data";

type Order = {
  id: string;
  customer: string;
  totalCentavos: number;
  status: string;
  createdAt: string;
};

type OrderFilter = "all" | "new" | "preparing" | "ready" | "completed";

const orderFilters: Array<{ value: OrderFilter; label: string }> = [
  { value: "all", label: "All orders" },
  { value: "new", label: "New" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
];

const statusDetails = {
  new: { label: "New", icon: Sparkles },
  preparing: { label: "Preparing", icon: ChefHat },
  ready: { label: "Ready", icon: CircleCheck },
  completed: { label: "Completed", icon: CheckCheck },
  cancelled: { label: "Cancelled", icon: XCircle },
} as const;

function OrderStatus({ status }: { status: string }) {
  const detail = statusDetails[status as keyof typeof statusDetails] ?? { label: status, icon: Clock3 };
  const Icon = detail.icon;

  return (
    <span className={`order-status order-status-${status}`}>
      <Icon aria-hidden="true" />
      {detail.label}
    </span>
  );
}

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function fetchOrders() {
  const response = await fetch("/api/orders", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load orders.");
  const data = await response.json() as { orders?: Order[] };
  return data.orders ?? [];
}

export function AdminDashboard({ adminName }: { adminName: string }) {
  const [selected, setSelected] = useState<ProductId>("plain");
  const [quantity, setQuantity] = useState(50);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("all");
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function loadOrders() {
    setOrdersLoading(true);
    setOrdersError("");

    try {
      setOrders(await fetchOrders());
      setLastUpdated(new Date());
    } catch {
      setOrdersError("Order activity could not be refreshed. Please try again.");
    } finally {
      setOrdersLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    void fetchOrders()
      .then((nextOrders) => {
        if (ignore) return;
        setOrders(nextOrders);
        setLastUpdated(new Date());
      })
      .catch(() => {
        if (!ignore) setOrdersError("Order activity could not be refreshed. Please try again.");
      })
      .finally(() => {
        if (!ignore) setOrdersLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const product = products.find((item) => item.id === selected)!;
  const revenue = product.price * quantity;
  const cost = product.cost * quantity;
  const profit = revenue - cost;
  const margin = revenue ? profit / revenue * 100 : 0;
  const unitProfit = product.price - product.cost;
  const activeOrders = orders.filter((order) => ["new", "preparing", "ready"].includes(order.status)).length;
  const savedOrderValue = orders.reduce((total, order) => total + order.totalCentavos, 0) / 100;
  const filteredOrders = useMemo(
    () => orderFilter === "all" ? orders : orders.filter((order) => order.status === orderFilter),
    [orderFilter, orders],
  );
  const initials = adminName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const metrics = [
    {
      label: "Active orders",
      value: String(activeOrders),
      note: "New, preparing, or ready",
      icon: ShoppingBag,
      tone: "live",
    },
    {
      label: "Week 1 sales",
      value: "₱7,515",
      note: "2023 reported revenue",
      icon: PhilippinePeso,
      tone: "historical",
      trend: "up",
    },
    {
      label: "Bazaar net income",
      value: "₱1,959",
      note: "2023 · 17.98% documented margin",
      icon: TrendingUp,
      tone: "historical",
      trend: "up",
    },
    {
      label: "Waste-loss week",
      value: "−₱573",
      note: "2023 · triggered the menu pivot",
      icon: ReceiptText,
      tone: "historical",
      trend: "down",
    },
  ];

  return (
    <section className="dashboard-stage">
      <header className="dashboard-command">
        <div className="dashboard-heading">
          <p className="micro-label light"><span /> ADMIN CONTROL ROOM</p>
          <h1>Operations,<br /><em>made visible.</em></h1>
          <p>Track current orders, test a selling-day plan, and compare the documented economics behind the original venture.</p>
        </div>

        <div className="dashboard-command-tools">
          <div className="dashboard-admin-card">
            <span className="dashboard-avatar" aria-hidden="true">{initials}</span>
            <div>
              <small>Administrator</small>
              <strong>{adminName}</strong>
              <span><i aria-hidden="true" /> Private workspace</span>
            </div>
            <ShieldCheck aria-hidden="true" />
          </div>
          <button className="dashboard-refresh" type="button" onClick={() => void loadOrders()} disabled={ordersLoading}>
            <RefreshCw className={ordersLoading ? "is-spinning" : ""} aria-hidden="true" />
            <span>{ordersLoading ? "Syncing orders" : "Refresh orders"}<small>{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" })}` : "Live order data"}</small></span>
          </button>
        </div>
      </header>

      <div className="dashboard-metrics" aria-label="Business summary">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className={`dashboard-metric metric-${metric.tone}`} key={metric.label}>
              <div><Icon aria-hidden="true" /><small>{metric.label}</small></div>
              <strong>{metric.value}</strong>
              <span className={metric.trend ? `metric-trend ${metric.trend}` : "metric-trend"}>
                {metric.trend === "up" && <ArrowUpRight aria-hidden="true" />}
                {metric.trend === "down" && <ArrowDownRight aria-hidden="true" />}
                {metric.note}
              </span>
            </article>
          );
        })}
      </div>

      <div className="dashboard-workspace">
        <article className="dashboard-panel orders-card">
          <header className="dashboard-panel-head">
            <div>
              <small>LIVE OPERATIONS</small>
              <h2>Order activity</h2>
              <p>{orders.length} saved orders · {formatPeso(savedOrderValue)} recorded value</p>
            </div>
            <span className="panel-live"><i aria-hidden="true" /> Live</span>
          </header>

          <div className="order-filters" aria-label="Filter orders">
            {orderFilters.map((filter) => (
              <button
                type="button"
                key={filter.value}
                className={orderFilter === filter.value ? "active" : ""}
                aria-pressed={orderFilter === filter.value}
                onClick={() => setOrderFilter(filter.value)}
              >
                {filter.label}
                <span>{filter.value === "all" ? orders.length : orders.filter((order) => order.status === filter.value).length}</span>
              </button>
            ))}
          </div>

          {ordersLoading ? (
            <div className="orders-state" role="status"><RefreshCw className="is-spinning" aria-hidden="true" /><span>Refreshing order activity…</span></div>
          ) : ordersError ? (
            <div className="orders-state orders-error" role="alert"><AlertTriangle aria-hidden="true" /><span>{ordersError}</span><button type="button" onClick={() => void loadOrders()}>Try again</button></div>
          ) : filteredOrders.length ? (
            <div className="orders-list" role="list">
              {filteredOrders.slice(0, 6).map((order) => (
                <div className="order-row" role="listitem" key={order.id}>
                  <span className="order-customer-avatar" aria-hidden="true">{order.customer.charAt(0).toUpperCase()}</span>
                  <span className="order-customer"><b>{order.customer}</b><small>{formatOrderDate(order.createdAt)} · #{order.id.slice(0, 6).toUpperCase()}</small></span>
                  <OrderStatus status={order.status} />
                  <strong>{formatPeso(order.totalCentavos / 100)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="orders-state"><ShoppingBag aria-hidden="true" /><span>{orderFilter === "all" ? "No orders yet. New signed-in orders will appear here." : `No ${orderFilter} orders right now.`}</span></div>
          )}
        </article>

        <article className="dashboard-panel scenario-card">
          <header className="dashboard-panel-head">
            <div><small>SCENARIO CALCULATOR</small><h2>Build a selling day</h2><p>Model one menu item using the documented 2023 costs.</p></div>
            <button className="panel-icon-button" type="button" onClick={() => { setSelected("plain"); setQuantity(50); }} aria-label="Reset calculator"><RotateCcw aria-hidden="true" /></button>
          </header>

          <div className="scenario-product-summary">
            <div><small>Selected menu item</small><strong>{product.label}</strong><span>{product.short}</span></div>
            <div><small>Unit profit</small><strong>{formatPeso(unitProfit)}</strong><span>{(unitProfit / product.price * 100).toFixed(1)}% gross margin</span></div>
          </div>

          <div className="scenario-tabs" aria-label="Choose a product">
            {products.map((item) => (
              <button type="button" key={item.id} aria-pressed={selected === item.id} className={selected === item.id ? "active" : ""} onClick={() => setSelected(item.id)}>
                <i className={`tone-${item.tone}`} aria-hidden="true" />
                {item.label.replace(" Dropwich", "")}
              </button>
            ))}
          </div>

          <div className="scenario-quantity-row">
            <label htmlFor="qty"><span>Planned quantity</span><small>10–70 sandwiches</small></label>
            <output htmlFor="qty">{quantity}<small> units</small></output>
          </div>
          <input className="scenario-range" id="qty" type="range" min="10" max="70" step="5" value={quantity} aria-valuetext={`${quantity} sandwiches`} onChange={(event) => setQuantity(Number(event.target.value))} />
          <div className="scenario-range-labels" aria-hidden="true"><span>10</span><span>70</span></div>

          <div className="scenario-results">
            <div><Banknote aria-hidden="true" /><span>Revenue</span><b>{formatPeso(revenue)}</b></div>
            <div><ReceiptText aria-hidden="true" /><span>Documented costs</span><b>−{formatPeso(cost)}</b></div>
            <div><WalletCards aria-hidden="true" /><span>Gross profit</span><b>{formatPeso(profit)}</b></div>
          </div>

          <div className="profit-progress">
            <div><span>Projected gross margin</span><strong>{margin.toFixed(1)}%</strong></div>
            <div className="profit-track" role="progressbar" aria-label="Projected gross margin" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number(margin.toFixed(1))}><i style={{ width: `${margin}%` }} /></div>
          </div>
        </article>
      </div>

      <div className="dashboard-insights">
        <article className="dashboard-panel economics-card">
          <header className="dashboard-panel-head">
            <div><small>DOCUMENTED UNIT ECONOMICS</small><h2>Margin by menu item</h2><p>Selling price compared with the original costing sheets.</p></div>
          </header>
          <div className="economics-grid">
            {products.map((item) => {
              const itemProfit = item.price - item.cost;
              const itemMargin = itemProfit / item.price * 100;
              return (
                <section className={`economics-item economics-${item.tone}`} key={item.id}>
                  <div><i aria-hidden="true" /><small>{item.short}</small><h3>{item.label}</h3></div>
                  <dl>
                    <div><dt>Selling price</dt><dd>{formatPeso(item.price)}</dd></div>
                    <div><dt>Unit cost</dt><dd>{formatPeso(item.cost)}</dd></div>
                    <div><dt>Unit profit</dt><dd>{formatPeso(itemProfit)}</dd></div>
                  </dl>
                  <div className="economics-margin"><span>Gross margin</span><strong>{itemMargin.toFixed(1)}%</strong></div>
                </section>
              );
            })}
          </div>
        </article>

        <aside className="finance-alert">
          <AlertTriangle aria-hidden="true" />
          <div><small>DATA QUALITY NOTE</small><h2>Read the numbers honestly.</h2><p>The source sheet says “30% markup,” but the listed selling prices produce different margins. Ketchup cost is missing, and egg quantities still need verification.</p></div>
        </aside>
      </div>
    </section>
  );
}
