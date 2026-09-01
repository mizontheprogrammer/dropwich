import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { ProductCardArt } from "../components/ProductCardArt";
import { formatPeso, products } from "../data";

export default async function MenuPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const query = (await searchParams)?.q?.trim() ?? "";
  const filteredProducts = query
    ? products.filter(product => `${product.label} ${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase()))
    : products;
  return (
    <main className="route menu-catalog-route">
      <SiteHeader active="menu" />

      <section className="catalog-stage">
        <header className="catalog-intro">
          <div>
            <h1>Pick your<br />Dropwich.</h1>
            <p>Choose a sandwich first. You’ll pick your sauce, add a note, and set the quantity on the next screen.</p>
          </div>
          {query && <div className="catalog-search-summary"><span>Search results for “{query}”</span><Link href="/menu">Clear search</Link></div>}
        </header>

        <div className="catalog-grid" aria-label="Dropwich sandwiches">
          {filteredProducts.map(product => (
            <Link
              className={`catalog-card catalog-card-${product.tone}`}
              href={`/menu/${product.id}`}
              key={product.id}
              aria-label={`Customize ${product.label}, ${formatPeso(product.price)}`}
            >
              <ProductCardArt />
              <h2>{product.label.split(" ").map(word => <span key={word}>{word}</span>)}</h2>
              <figure>
                <Image src={product.image} unoptimized loading="eager" alt={`${product.label} in Dropwich packaging`} width={1254} height={1254} />
              </figure>
              <footer>
                <div><b>{formatPeso(product.price)}</b></div>
                <strong>Pick your sauce <ArrowRight /></strong>
              </footer>
            </Link>
          ))}
        </div>
        {!filteredProducts.length && <div className="catalog-empty"><Search aria-hidden="true" /><h2>No sandwiches found.</h2><p>Try “ham,” “egg,” or browse the complete menu.</p><Link href="/menu">View all sandwiches</Link></div>}
      </section>
    </main>
  );
}
