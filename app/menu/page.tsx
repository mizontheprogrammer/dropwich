import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { formatPeso, products } from "../data";

export default function MenuPage() {
  return (
    <main className="route menu-catalog-route">
      <SiteHeader active="menu" />

      <section className="catalog-stage">
        <header className="catalog-intro">
          <p className="micro-label"><span /> ORIGINAL 2023 LINEUP</p>
          <div>
            <h1>Pick your<br />Dropwich.</h1>
            <p>Choose a sandwich first. You’ll pick your sauce, add a note, and set the quantity on the next screen.</p>
          </div>
        </header>

        <div className="catalog-grid" aria-label="Dropwich sandwiches">
          {products.map(product => (
            <Link
              className={`catalog-card catalog-card-${product.tone}`}
              href={`/menu/${product.id}`}
              key={product.id}
              aria-label={`Customize ${product.label}, ${formatPeso(product.price)}`}
            >
              <span className="catalog-card-kicker">{product.short}</span>
              <h2>{product.label.split(" ").map(word => <span key={word}>{word}</span>)}</h2>
              <figure>
                <span className="catalog-ghost-number" aria-hidden="true">{product.number}</span>
                <Image src={product.image} unoptimized alt={`${product.label} in Dropwich packaging`} width={1254} height={1254} />
              </figure>
              <footer>
                <div><span>{product.number}</span><b>{formatPeso(product.price)}</b></div>
                <strong>Pick your sauce <ArrowRight /></strong>
              </footer>
            </Link>
          ))}
        </div>
      </section>

      <div className="route-footer"><span>THREE ORIGINAL FLAVORS</span><p>Choose first. Customize next.</p><span>02 — MENU</span></div>
    </main>
  );
}
