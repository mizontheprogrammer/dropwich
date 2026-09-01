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
              <h2>{product.label.split(" ").map(word => <span key={word}>{word}</span>)}</h2>
              <figure>
                <Image src={product.image} unoptimized alt={`${product.label} in Dropwich packaging`} width={1254} height={1254} />
              </figure>
              <footer>
                <div><b>{formatPeso(product.price)}</b></div>
                <strong>Pick your sauce <ArrowRight /></strong>
              </footer>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
