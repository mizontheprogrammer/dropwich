"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { formatPeso, products, ProductId } from "../data";

type CartItem = { id: string; productId: ProductId; quantity: number; sauce: string; notes: string };
const sauces = [
  { name: "Ketchup", image: "/sauces/ketchup.webp", note: "Bright and tangy" },
  { name: "Mayo", image: "/sauces/mayo.webp", note: "Smooth and creamy" },
  { name: "Ketchup + Mayo", image: "/sauces/ketchup-mayo.webp", note: "The classic mix" },
  { name: "No sauce", image: "/sauces/no-sauce.webp", note: "Keep it simple" },
  { name: "Extra house sauce", image: "/sauces/house-sauce.webp", note: "Creamy signature blend" },
];

export default function MenuPage() {
  const [selected, setSelected] = useState<ProductId>("plain");
  const [sauce, setSauce] = useState("Ketchup + Mayo");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "complete" | "signin" | "error">("idle");
  const product = products.find(item => item.id === selected)!;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + products.find(productItem => productItem.id === item.productId)!.price * item.quantity, 0);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("product") as ProductId | null;
    const shouldScroll = window.location.hash === "#customize-order";
    const frame = requestAnimationFrame(() => {
      if (requested && products.some(item => item.id === requested)) setSelected(requested);
      if (shouldScroll) document.getElementById("customize-order")?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const openCustomizer = (id: ProductId) => {
    setSelected(id); setQuantity(1);
    requestAnimationFrame(() => document.getElementById("customize-order")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const addToCart = () => {
    setCart(current => [...current, { id: crypto.randomUUID(), productId: product.id, quantity, sauce, notes: notes.trim().slice(0, 160) }]);
    setQuantity(1); setNotes(""); setStatus("idle"); setDrawer(true);
  };
  const updateQuantity = (id: string, amount: number) => setCart(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(0, Math.min(10, item.quantity + amount)) } : item).filter(item => item.quantity > 0));
  const placeOrder = async () => {
    setStatus("sending");
    const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart.map(({ productId, quantity, sauce, notes }) => ({ productId, quantity, sauce, notes })) }) });
    if (response.status === 401) return setStatus("signin");
    if (!response.ok) return setStatus("error");
    setCart([]); setStatus("complete");
  };

  return <main className={`route menu-route tone-${product.tone}`}>
    <SiteHeader active="menu" />
    <section className="menu-stage">
      <div className="menu-index"><p className="micro-label"><span /> ORIGINAL 2023 LINEUP</p><div className="menu-tabs" role="tablist" aria-label="Dropwich menu">{products.map(item => <button key={item.id} role="tab" aria-selected={selected === item.id} className={selected === item.id ? "active" : ""} onClick={() => { setSelected(item.id); setQuantity(1); }}><span>{item.number}</span><div><small>{item.short}</small><strong>{item.label}</strong></div></button>)}</div></div>
      <div className="menu-showcase" id="customize-order">
        <div className="menu-food"><span className="giant-number">{product.number}</span><Image src={product.image} unoptimized alt={`${product.label} in Dropwich packaging`} width={1254} height={1254} priority /></div>
        <div className="menu-details">
          <span className="category">{product.label}</span><h1>{product.name}</h1><p>{product.description}</p>
          <div className="menu-price"><b>{formatPeso(product.price)}</b><span>Original documented price</span></div>
          <fieldset className="sauce-options"><legend>Choose your sauce</legend><div className="sauce-grid">{sauces.map(option => <button type="button" key={option.name} className={`sauce-card ${sauce === option.name ? "active" : ""}`} aria-pressed={sauce === option.name} onClick={() => setSauce(option.name)}><Image src={option.image} unoptimized alt={`${option.name} sauce option`} width={1024} height={1024} /><span><strong>{option.name}</strong><small>{option.note}</small></span>{sauce === option.name && <Check />}</button>)}</div></fieldset>
          <label className="notes-field">Special instructions <span>Optional</span><textarea value={notes} maxLength={160} onChange={event => setNotes(event.target.value)} placeholder="Example: lightly toasted, sauce on the side" /></label>
          <div className="add-row"><div className="large-stepper"><button onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Increase quantity"><Plus /></button></div><button className="add-button" onClick={addToCart}>Add · {formatPeso(product.price * quantity)} <ShoppingBag /></button></div>
        </div>
      </div>
    </section>
    <section className="menu-gallery"><header><p className="micro-label"><span /> MADE YOUR WAY</p><h2>Three originals.<br />Plenty of combinations.</h2></header><div>{products.map(item => <button type="button" className="menu-gallery-card" key={item.id} onClick={() => openCustomizer(item.id)} aria-label={`Customize ${item.label}`}>
      <span className="gallery-display-name">{item.label.split(" ").map(word => <span key={word}>{word}</span>)}</span>
      <figure><Image className="gallery-image gallery-image-rest" src={item.image} unoptimized alt="" width={1254} height={1254} /><Image className="gallery-image gallery-image-reveal" src={item.image} unoptimized alt={`${item.label} in Dropwich packaging`} width={1254} height={1254} /></figure>
      <span className="gallery-number">{item.number}</span><strong>{item.label}</strong><p>{item.description}</p>
    </button>)}</div></section>
    <button className="floating-cart" onClick={() => { setDrawer(true); setStatus("idle"); }}><ShoppingBag /><span>Your order</span><b>{count}</b></button>
    <div className="route-footer"><span>THREE ORIGINAL FLAVORS</span><p>Customize sauces and special instructions.</p><span>02 — MENU</span></div>
    {drawer && <div className="order-overlay" onMouseDown={() => setDrawer(false)}><aside onMouseDown={event => event.stopPropagation()} aria-label="Your order" role="dialog" aria-modal="true"><header><div><small>DROPWICH ORDER</small><h2>Your tray</h2></div><button onClick={() => setDrawer(false)} aria-label="Close order"><X /></button></header>
      {status === "complete" ? <div className="order-message"><span><Check /></span><h3>Order received.</h3><p>Your order was saved and is now visible to the administrator.</p><button onClick={() => { setStatus("idle"); setDrawer(false); }}>Continue</button></div> : status === "signin" ? <div className="order-message"><ShoppingBag /><h3>Sign in to order.</h3><p>Create an account or sign in, then return to place your order.</p><Link className="order-link" href="/account?returnTo=/menu">Continue to sign in <ChevronRight /></Link></div> : cart.length ? <><div className="order-items">{cart.map(item => { const cartProduct = products.find(productItem => productItem.id === item.productId)!; return <div key={item.id}><Image src={cartProduct.image} unoptimized alt="" width={1254} height={1254} /><section><small>{cartProduct.label}</small><strong>{cartProduct.name}</strong><span>{item.sauce}{item.notes ? ` · ${item.notes}` : ""}</span><b>{formatPeso(cartProduct.price * item.quantity)}</b></section><div className="mini-stepper"><button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease"><Minus /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase"><Plus /></button></div></div>})}</div><footer><div><span>Total</span><b>{formatPeso(total)}</b></div>{status === "error" && <p className="order-error" role="alert">We couldn’t place the order. Please try again.</p>}<button disabled={status === "sending"} onClick={placeOrder}>{status === "sending" ? "Placing order…" : "Place order"}</button></footer></> : <div className="order-message"><ShoppingBag /><h3>Your tray is empty.</h3><p>Choose a Dropwich and make it yours.</p><button onClick={() => setDrawer(false)}>Browse menu</button></div>}
    </aside></div>}
  </main>;
}
