import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { formatPeso, products } from "../data";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Dropwich sandwiches">
          {filteredProducts.map((product, i) => (
            <Link
              className={`group relative rounded-[2rem] border border-line/50 p-8 flex flex-col h-[500px] md:h-[600px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent ${
                product.tone === 'sun' ? 'bg-yellow/20 hover:bg-yellow/30' :
                product.tone === 'coral' ? 'bg-coral/20 hover:bg-coral/30' : 'bg-sage/20 hover:bg-sage/30'
              }`}
              href={`/menu/${product.id}`}
              key={product.id}
              aria-label={`Customize ${product.label}, ${formatPeso(product.price)}`}
            >
              <div className="z-10 flex justify-between items-start mb-auto">
                <span className="font-fraunces text-2xl font-bold opacity-50">0{i + 1}</span>
              </div>

              <h2 className="z-10 font-fraunces text-4xl md:text-5xl font-black uppercase tracking-tight text-balance mb-4">
                {product.label.split(" ").map(word => <span key={word} className="block">{word}</span>)}
              </h2>

              <figure className="absolute bottom-16 right-[-10%] w-[120%] h-[60%] flex items-end justify-center z-0">
                <div className="absolute inset-x-0 bottom-10 h-1/2 bg-gradient-to-t from-black/5 to-transparent blur-2xl" />
                <Image
                  src={product.image}
                  unoptimized
                  loading={i < 3 ? "eager" : "lazy"}
                  alt={`${product.label} in Dropwich packaging`}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  width={1254}
                  height={1254}
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out"
                />
              </figure>

              <footer className="z-10 mt-auto pt-6 border-t border-ink/10 flex items-center justify-between">
                <b className="font-fraunces text-2xl">{formatPeso(product.price)}</b>
                <strong className="flex items-center gap-2 text-sm font-extrabold bg-white/50 px-4 py-2 rounded-full group-hover:bg-ink group-hover:text-white transition-colors duration-300">
                  Pick your sauce <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </strong>
              </footer>
            </Link>
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
