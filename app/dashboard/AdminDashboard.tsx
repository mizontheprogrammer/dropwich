"use client";

import { AlertTriangle, ArrowDownRight, ArrowUpRight, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPeso, products, ProductId } from "../data";

type Order = { id: string; customer: string; totalCentavos: number; status: string; createdAt: string };

export function AdminDashboard({ adminName }: { adminName: string }) {
  const [selected, setSelected] = useState<ProductId>("plain");
  const [quantity, setQuantity] = useState(50);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { fetch("/api/orders").then(response => response.ok ? response.json() : { orders: [] }).then(data => setOrders(data.orders)); }, []);
  const product = products.find(item => item.id === selected)!;
  const revenue = product.price * quantity; const cost = product.cost * quantity; const profit = revenue - cost; const margin = profit / revenue * 100;
  return <section className="dashboard-stage"><header className="dashboard-title"><div><p className="micro-label"><span /> ADMIN CONTROL ROOM</p><h1>The business<br />behind the bite.</h1></div><div className="admin-welcome"><ShieldCheck /><span>Administrator</span><b>{adminName}</b></div></header>
    <div className="dashboard-cards"><article><small>WEEK 1 SALES</small><strong>₱7,515</strong><span className="positive"><ArrowUpRight /> actual reported revenue</span></article><article><small>BAZAAR NET INCOME</small><strong>₱1,959</strong><span className="positive"><ArrowUpRight /> 17.98% net margin</span></article><article><small>INCOMING ORDERS</small><strong>{orders.length}</strong><span>latest saved orders</span></article><article><small>WASTE-LOSS WEEK</small><strong>−₱573</strong><span className="negative"><ArrowDownRight /> led to new products</span></article></div>
    <div className="dashboard-lower"><article className="scenario-card"><header><div><small>SCENARIO CALCULATOR</small><h2>Build a selling day</h2></div><button onClick={() => { setSelected("plain"); setQuantity(50); }} aria-label="Reset calculator"><RotateCcw /></button></header><div className="scenario-tabs">{products.map(item => <button key={item.id} className={selected === item.id ? "active" : ""} onClick={() => setSelected(item.id)}>{item.label.replace(" Dropwich", "")}</button>)}</div><label htmlFor="qty"><span>Sandwiches</span><b>{quantity}</b></label><input id="qty" type="range" min="10" max="70" step="5" value={quantity} onChange={event => setQuantity(Number(event.target.value))} /><div className="scenario-results"><div><span>Revenue</span><b>{formatPeso(revenue)}</b></div><div><span>Documented costs</span><b>−{formatPeso(cost)}</b></div><div><span>Gross profit</span><b>{formatPeso(profit)}</b></div></div><div className="profit-bar"><i style={{ width: `${margin}%` }} /><span>{margin.toFixed(1)}% margin</span></div></article>
      <article className="economics-card"><header><small>RECENT ORDERS</small><h2>Order activity</h2></header>{orders.length ? <div className="orders-list">{orders.slice(0,5).map(order => <div key={order.id}><span><b>{order.customer}</b><small>{new Date(order.createdAt).toLocaleString("en-PH")}</small></span><span className="order-status">{order.status}</span><strong>{formatPeso(order.totalCentavos / 100)}</strong></div>)}</div> : <div className="orders-empty">No orders yet. New signed-in orders will appear here.</div>}<div className="finance-alert"><AlertTriangle /><p><b>Source note</b>The original sheet says “30% markup,” but its selling prices produce different margins. Ketchup cost is missing, and egg quantities need verification.</p></div></article>
    </div></section>;
}
