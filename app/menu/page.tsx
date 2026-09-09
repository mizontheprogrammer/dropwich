import Link from "next/link";
import { Search } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { ProductShowcaseCard } from "../components/ProductShowcaseCard";
import { products } from "../data";

export default async function MenuPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const query = (await searchParams)?.q?.trim() ?? "";
  const filteredProducts = query
    ? products.filter(product => `${product.label} ${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase()))
    : products;

  return (
    <main id="main-content" className="min-h-screen bg-paper text-ink font-manrope selection:bg-yellow/40">
      <SiteHeader active="menu" />

      <section className="px-6 py-12 md:px-12 lg:px-24 md:py-24 max-w-[1600px] mx-auto">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="font-fraunces text-5xl md:text-7xl lg:text-[7rem] font-black leading-[0.85] tracking-tight">
              Pick your<br /><span className="text-red">Dropwich.</span>
            </h1>
            <p className="mt-8 text-muted text-lg md:text-xl leading-relaxed">
              Choose a sandwich first. You’ll pick your sauce, add a note, and set the quantity on the next screen.
            </p>
          </div>
          {query && (
            <div className="bg-white/60 backdrop-blur-md border border-line p-6 rounded-3xl shadow-sm flex flex-col gap-3 min-w-[300px]">
              <span className="text-sm font-semibold text-muted">Search results for <strong className="text-ink text-base">“{query}”</strong></span>
              <Link href="/menu" className="text-sm font-extrabold text-red hover:text-ink transition-colors">Clear search</Link>
            </div>
          )}
        </header>

        <div className="catalog-showcase-grid" aria-label="Dropwich sandwiches">
          {filteredProducts.map((product, i) => (
            <ProductShowcaseCard key={product.id} product={product} index={i} showOrderDetails />
          ))}
        </div>

        {!filteredProducts.length && (
          <div className="w-full min-h-[400px] border border-dashed border-line rounded-[3rem] bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center text-center p-12 gap-4">
            <div className="w-20 h-20 bg-red/10 text-red rounded-full flex items-center justify-center mb-4">
              <Search size={32} aria-hidden="true" />
            </div>
            <h2 className="font-fraunces text-4xl font-bold">No sandwiches found.</h2>
            <p className="text-muted text-lg max-w-md">Try “ham,” “egg,” or browse the complete menu.</p>
            <Link href="/menu" className="mt-4 h-14 px-8 flex items-center justify-center rounded-full bg-red text-white font-extrabold text-sm shadow-lg shadow-red/20 hover:-translate-y-1 hover:shadow-xl transition-all">
              View all sandwiches
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
