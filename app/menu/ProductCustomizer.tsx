"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { formatPeso, products, ProductId } from "../data";

type CartItem = { id: string; productId: ProductId; quantity: number; sauce: string; notes: string };

const sauces = [
  { name: "Ketchup", image: "/sauces/ketchup-v2.webp", note: "Bright and tangy" },
  { name: "Mayo", image: "/sauces/mayo-v2.webp", note: "Smooth and creamy" },
  { name: "Ketchup + Mayo", image: "/sauces/ketchup-mayo-v2.webp", note: "The classic mix" },
  { name: "No sauce", image: "/sauces/no-sauce-v2.webp", note: "Keep it simple" },
  { name: "Extra house sauce", image: "/sauces/house-sauce-v2.webp", note: "Creamy signature blend" },
];

export function ProductCustomizer({ initialProduct }: { initialProduct: ProductId }) {
  const [selected] = useState<ProductId>(initialProduct);
  const [sauce, setSauce] = useState("Ketchup + Mayo");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "complete" | "signin" | "error">("idle");

  const product = products.find(item => item.id === selected)!;
  const selectedSauce = sauces.find(option => option.name === sauce)!;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + products.find(productItem => productItem.id === item.productId)!.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!drawer) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawer(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [drawer]);

  const addToCart = () => {
    setCart(current => [
      ...current,
      { id: crypto.randomUUID(), productId: product.id, quantity, sauce, notes: notes.trim().slice(0, 160) },
    ]);
    setQuantity(1);
    setNotes("");
    setStatus("idle");
    setDrawer(true);
  };

  const updateQuantity = (id: string, amount: number) =>
    setCart(current =>
      current
        .map(item => (item.id === id ? { ...item, quantity: Math.max(0, Math.min(10, item.quantity + amount)) } : item))
        .filter(item => item.quantity > 0),
    );

  const removeItem = (id: string) => setCart(current => current.filter(item => item.id !== id));

  const placeOrder = async () => {
    setStatus("sending");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map(({ productId, quantity: itemQuantity, sauce: itemSauce, notes: itemNotes }) => ({
          productId,
          quantity: itemQuantity,
          sauce: itemSauce,
          notes: itemNotes,
        })),
      }),
    });
    if (response.status === 401) return setStatus("signin");
    if (!response.ok) return setStatus("error");
    setCart([]);
    setStatus("complete");
  };

  return (
    <main className={`route menu-route product-config-route tone-${product.tone}`}>
      <SiteHeader active="menu" />

      <section className="product-config-stage">
        <nav className="product-config-nav" aria-label="Product navigation">
          <Link href="/menu"><ArrowLeft /> Back to all sandwiches</Link>
          <span>{product.number} / {products.length.toString().padStart(2, "0")}</span>
        </nav>
        <div className="menu-showcase">
          <div className="menu-food">
            <span className="giant-number">{product.number}</span>
            <Image src={product.image} unoptimized alt={`${product.label} in Dropwich packaging`} width={1254} height={1254} priority />
          </div>

          <div className="menu-details">
            <div className="customizer-kicker"><span>{product.number}</span> BUILD YOUR DROPWICH</div>
            <span className="category">{product.label}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="menu-price"><b>{formatPeso(product.price)}</b><span>Original documented price</span></div>

            <fieldset className="sauce-options">
              <legend><span>1</span> Pick your sauce</legend>
              <div className="sauce-grid">
                {sauces.map(option => (
                  <button
                    type="button"
                    key={option.name}
                    className={`sauce-card ${sauce === option.name ? "active" : ""}`}
                    aria-pressed={sauce === option.name}
                    onClick={() => setSauce(option.name)}
                  >
                    <span className="sauce-card-media">
                      <Image src={option.image} unoptimized alt="" width={640} height={640} />
                    </span>
                    <span className="sauce-card-copy"><strong>{option.name}</strong><small>{option.note}</small></span>
                    <span className="sauce-check" aria-hidden="true"><Check /></span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="notes-field">
              <span><b>2</b> Add a note <small>Optional</small></span>
              <textarea
                value={notes}
                maxLength={160}
                onChange={event => setNotes(event.target.value)}
                placeholder="Example: lightly toasted, sauce on the side"
              />
            </label>

            <div className="choice-summary" aria-live="polite">
              <span><Image src={selectedSauce.image} unoptimized alt="" width={640} height={640} /></span>
              <div><small>Your build</small><strong>{product.label}</strong><p>{sauce}{notes ? " · note added" : ""}</p></div>
              <b>{formatPeso(product.price * quantity)}</b>
            </div>

            <div className="add-row">
              <div className="large-stepper" aria-label="Quantity">
                <button disabled={quantity === 1} onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></button>
                <span><small>QTY</small>{quantity}</span>
                <button disabled={quantity === 10} onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Increase quantity"><Plus /></button>
              </div>
              <button className="add-button" onClick={addToCart}><span>Add to tray <small>{formatPeso(product.price * quantity)}</small></span><ShoppingBag /></button>
            </div>
          </div>
        </div>
      </section>

      <button className="floating-cart" onClick={() => { setDrawer(true); setStatus("idle"); }} aria-label={`Open order tray with ${count} items`}>
        <ShoppingBag /><span>Your tray</span><b aria-live="polite">{count}</b>
      </button>

      <div className="route-footer"><span>THREE ORIGINAL FLAVORS</span><p>Customize sauces and special instructions.</p><span>02 — MENU</span></div>

      {drawer && (
        <div className="order-overlay" onMouseDown={() => setDrawer(false)}>
          <aside onMouseDown={event => event.stopPropagation()} aria-labelledby="order-title" role="dialog" aria-modal="true">
            <header>
              <div><small>DROPWICH ORDER</small><h2 id="order-title">Your tray</h2><p>{count ? `${count} ${count === 1 ? "item" : "items"} ready to review` : "Ready when you are"}</p></div>
              <button onClick={() => setDrawer(false)} aria-label="Close order"><X /></button>
            </header>

            {status === "complete" ? (
              <div className="order-message"><span><Check /></span><h3>Order received.</h3><p>Your order was saved and is now visible to the administrator.</p><button onClick={() => { setStatus("idle"); setDrawer(false); }}>Continue</button></div>
            ) : status === "signin" ? (
              <div className="order-message"><ShoppingBag /><h3>Sign in to order.</h3><p>Create an account or sign in, then return to place your order.</p><Link className="order-link" href={`/account?returnTo=/menu/${product.id}`}>Continue to sign in <ChevronRight /></Link></div>
            ) : cart.length ? (
              <>
                <div className="order-items">
                  {cart.map(item => {
                    const cartProduct = products.find(productItem => productItem.id === item.productId)!;
                    return (
                      <article key={item.id}>
                        <div className="order-item-image"><Image src={cartProduct.image} unoptimized alt="" width={1254} height={1254} /></div>
                        <section>
                          <small>{cartProduct.label}</small>
                          <strong>{cartProduct.name}</strong>
                          <span>{item.sauce}</span>
                          {item.notes && <p>{item.notes}</p>}
                          <b>{formatPeso(cartProduct.price * item.quantity)}</b>
                        </section>
                        <button className="remove-item" onClick={() => removeItem(item.id)} aria-label={`Remove ${cartProduct.label}`}><Trash2 /></button>
                        <div className="mini-stepper" aria-label={`${cartProduct.label} quantity`}>
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus /></button>
                          <b>{item.quantity}</b>
                          <button disabled={item.quantity === 10} onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus /></button>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <footer>
                  <div className="order-summary"><span><small>ORDER TOTAL</small>Historical student pricing</span><b>{formatPeso(total)}</b></div>
                  {status === "error" && <p className="order-error" role="alert">We couldn’t place the order. Please try again.</p>}
                  <button disabled={status === "sending"} onClick={placeOrder}>{status === "sending" ? "Placing order…" : `Place order · ${formatPeso(total)}`}</button>
                  <button className="continue-shopping" onClick={() => setDrawer(false)}>Keep browsing</button>
                </footer>
              </>
            ) : (
              <div className="order-message"><ShoppingBag /><h3>Your tray is empty.</h3><p>Choose a Dropwich and make it yours.</p><button onClick={() => setDrawer(false)}>Browse menu</button></div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
