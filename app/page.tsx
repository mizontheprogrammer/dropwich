import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { DropwichGallery } from "./components/HomeExperience";
import { IngredientBurst } from "./components/IngredientBurst";
import { products } from "./data";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-cream text-ink font-manrope selection:bg-yellow/40">
      <SiteHeader active="home" />

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:px-12 lg:px-24 md:py-24 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-92px)]">
        <div className="z-10 flex flex-col items-start gap-8">
          <h1 className="font-fraunces text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-black leading-[0.85] tracking-tight">
            <span className="text-red">Big flavor.</span><br />
            Small beginnings.
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-xl leading-relaxed">
            Dropwich began as a student-run egg sandwich venture in 2023, perfected through real feedback.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link className="h-14 px-8 flex items-center justify-center gap-3 rounded-full bg-ink text-white font-extrabold text-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" href="/menu">
              Explore the menu <ArrowRight size={18} />
            </Link>
            <Link className="group flex items-center gap-2 border-b-2 border-ink pb-1 font-extrabold text-sm hover:text-red hover:border-red transition-colors" href="/story">
              Discover the story <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full max-w-2xl mt-8 pt-8 border-t border-line grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <strong className="font-fraunces text-2xl md:text-3xl">Sold out</strong>
              <span className="text-muted text-xs md:text-sm font-semibold">opening day</span>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-fraunces text-2xl md:text-3xl">60</strong>
              <span className="text-muted text-xs md:text-sm font-semibold">order capacity</span>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-fraunces text-2xl md:text-3xl">₱7,515</strong>
              <span className="text-muted text-xs md:text-sm font-semibold">Week 1 sales</span>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow rounded-full shadow-2xl opacity-80 backdrop-blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute inset-6 border-2 border-dashed border-ink/20 rounded-full" />
          <Image
            className="relative z-10 w-[110%] h-[110%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
            src="/products/plain.png"
            unoptimized
            alt="Plain Dropwich egg sandwich"
            sizes="(max-width: 1024px) 90vw, 50vw"
            width={1254} height={1254} priority
          />
          <div className="absolute bottom-8 left-4 z-20 bg-white/80 backdrop-blur-md border border-line p-4 rounded-2xl shadow-xl flex flex-col items-center rotate-[-4deg] hover:rotate-0 transition-transform">
            <strong className="font-fraunces text-4xl text-red leading-none">₱89</strong>
            <span className="text-muted text-xs font-bold uppercase tracking-wider mt-1">2023 price</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Menu Preview */}
      <section className="px-6 py-24 md:px-12 lg:px-24 bg-white border-t border-line overflow-x-clip">
        <div className="max-w-[1600px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2 className="font-fraunces text-5xl md:text-7xl font-bold leading-none tracking-tight">
              Made to stand<br />out of the box.
            </h2>
            <Link className="flex items-center gap-2 font-extrabold text-sm text-red hover:gap-4 transition-all" href="/menu">
              See every option <ArrowRight size={18} />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.slice(0, 3).map((product, i) => (
              <article key={product.id} className="ingredient-card group relative p-8 md:p-10 isolate flex flex-col h-[440px] md:h-[520px] lg:h-[610px] transition-transform duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 overflow-hidden rounded-[2rem] border border-ink/10 transition-shadow duration-500 group-hover:shadow-2xl ${
                product.tone === 'sun' ? 'bg-yellow' :
                product.tone === 'coral' ? 'bg-coral' : 'bg-sage'
              }`} aria-hidden="true">
                  <div className="absolute left-[12%] right-[12%] top-[18%] aspect-square rounded-full bg-white/35 z-0 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-[28px] border-white/20 z-0" />
                </div>
                <IngredientBurst kind={product.id as "plain" | "ham" | "hungarian"} />
                <div className="z-10 flex justify-between items-start">
                  <span className="font-fraunces text-2xl font-bold">0{i + 1}</span>
                  <Link href={`/menu/${product.id}`} aria-label={`Customize ${product.label}`} className="w-12 h-12 bg-white/90 text-ink rounded-full flex items-center justify-center shadow-sm hover:bg-ink hover:text-white hover:scale-110 transition-all">
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <h3 className="z-20 mt-auto max-w-[95%] font-fraunces text-4xl md:text-5xl lg:text-[3.35rem] font-black uppercase leading-[0.9] tracking-tight text-balance">
                  {product.label}
                </h3>
                <Image
                  src={product.image}
                  unoptimized
                  alt={product.label}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  width={800} height={800}
                  className={`absolute left-1/2 -translate-x-1/2 object-contain object-center drop-shadow-2xl transition-transform duration-700 ease-out z-10 group-hover:scale-105 ${product.id === "hungarian" ? "bottom-[-5%] w-[106%] h-[106%]" : "bottom-[-7%] w-[112%] h-[112%]"}`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <DropwichGallery story />

      {/* Feature Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24 bg-paper max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative aspect-square w-full max-w-[600px] mx-auto order-2 lg:order-1">
          <div className="absolute inset-0 bg-coral/30 rounded-[3rem] rotate-3" />
          <div className="absolute inset-0 bg-white rounded-[3rem] border border-line -rotate-2" />
          <Image
            src="/products/hungarian.png"
            unoptimized
            alt="Hungarian Dropwich egg sandwich"
            sizes="(max-width: 1024px) 90vw, 50vw"
            width={1254} height={1254}
            className="relative z-10 w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col items-start gap-6 order-1 lg:order-2">
          <span className="text-red font-extrabold tracking-wider uppercase text-sm">Featured</span>
          <h2 className="font-fraunces text-5xl md:text-7xl font-black leading-none tracking-tight">
            Smoky.<br />
            <em className="text-red not-italic">Cheesy.</em><br />
            Unmistakable.
          </h2>
          <p className="text-muted text-lg max-w-md leading-relaxed">
            Our biggest sandwich pairs creamy egg and melted cheese with Hungarian sausage, wrapped in buttery toasted bread.
          </p>
          <Link className="mt-4 h-14 px-8 flex items-center justify-center gap-3 rounded-full bg-red text-white font-extrabold text-sm shadow-lg shadow-red/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" href="/menu">
            Build your order <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Belief Banner */}
      <section className="m-6 md:m-12 lg:m-24 p-12 md:p-24 bg-ink rounded-[3rem] text-white flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,201,80,0.15)_0%,transparent_70%)]" />
        <h2 className="z-10 font-fraunces text-6xl md:text-8xl font-black">
          <span className="text-white/60">Eat</span> better.
        </h2>
        <p className="z-10 text-white/80 text-lg md:text-xl max-w-lg">
          Shaped by customer feedback and improved through real selling.
        </p>
        <Link className="z-10 mt-4 flex items-center gap-2 border-b-2 border-yellow pb-1 font-extrabold text-sm text-yellow hover:text-white hover:border-white transition-colors" href="/story">
          Meet the team <ArrowDownRight size={18} />
        </Link>
      </section>
    </main>
  );
}
