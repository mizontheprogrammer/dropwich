import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { products } from "./data";

export default function Home() {
  return <main className="route home-route">
    <SiteHeader active="home" />
    <section className="home-stage">
      <div className="home-copy">
        <p className="micro-label"><span /> A SCHOOL-BORN FOOD PROJECT</p>
        <h1><span>Big flavor.</span><br />Small beginnings.</h1>
        <p className="lead">Dropwich was a real student-run egg sandwich venture in 2023. This modern reconstruction turns the original menu, feedback, and finance records into a portfolio-ready digital product.</p>
        <div className="home-actions">
          <Link className="pill-button dark" href="/menu">Explore the menu <ArrowRight /></Link>
          <Link className="line-link" href="/story">Discover the story <ArrowDownRight /></Link>
        </div>
        <div className="home-facts"><span><b>Sold out</b> opening day</span><span><b>60</b> order capacity</span><span><b>₱7,515</b> Week 1 sales</span></div>
      </div>
      <div className="home-product">
        <div className="product-disc"><span className="disc-copy">CREAMY · TOASTED · STUDENT MADE ·</span><div className="hero-sandwich-float"><Image className="hero-real-sandwich" src="/products/plain.png" unoptimized alt="Plain Dropwich egg sandwich" width={1254} height={1254} priority /></div></div>
        <div className="hero-badge"><Sparkles /><b>2026</b><span>PORTFOLIO<br />REBUILD</span></div>
        <div className="hero-price"><span>THE ORIGINAL</span><b>₱89</b><small>historical price</small></div>
      </div>
    </section>
    <section className="home-menu-preview">
      <header><p className="micro-label"><span /> THE DROPWICH LINEUP</p><h2>Made to stand<br />out of the box.</h2><Link href="/menu">See every option <ArrowRight /></Link></header>
      <div>{products.map(product => <article key={product.id} className={product.tone}>
        <Link className="product-card-link" href={`/menu?product=${product.id}#customize-order`} aria-label={`Customize ${product.label}, ₱${product.price}`}>
          <h3>{product.label.split(" ").map(word => <span key={word}>{word}</span>)}</h3>
          <Image src={product.image} unoptimized alt={product.label} width={1254} height={1254} />
        </Link>
      </article>)}</div>
    </section>
    <section className="home-feature">
      <div className="home-feature-art">
        <Image src="/products/hungarian.png" unoptimized alt="Hungarian Dropwich egg sandwich" width={1254} height={1254} />
      </div>
      <div className="home-feature-copy">
        <p className="micro-label"><span /> FEATURED DROP</p>
        <small>03 / HUNGARIAN DROPWICH</small>
        <h2><span>Smoky.</span><span><em>Cheesy.</em></span><span>Unmistakable.</span></h2>
        <p>Our biggest sandwich pairs creamy egg and melted cheese with Hungarian sausage, wrapped in buttery toasted bread.</p>
        <Link className="pill-button dark" href="/menu">Build your order <ArrowRight /></Link>
      </div>
    </section>
    <section className="home-belief">
      <p className="micro-label light"><span /> WHY DROPWICH</p>
      <div><span>Eat</span><strong>better.</strong></div>
      <p>Made from feedback, improved through real selling, and rebuilt to show what a student team can learn when an idea meets actual customers.</p>
      <Link href="/story">Meet the team <ArrowDownRight /></Link>
    </section>
    <div className="route-footer"><span>DROPWICH / MANILA</span><p>A student venture reconstructed as a working restaurant system.</p><span>01 — HOME</span></div>
  </main>;
}
