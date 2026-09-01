import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { HomeExperience } from "./components/HomeExperience";
import { ProductCardArt } from "./components/ProductCardArt";
import { products } from "./data";

export default function Home() {
  return <main className="route home-route">
    <SiteHeader active="home" />
    <section className="home-stage">
      <div className="home-copy">
        <h1><span>Big flavor.</span><br />Small beginnings.</h1>
        <p className="lead">Dropwich began as a student-run egg sandwich venture in 2023.</p>
        <div className="home-actions">
          <Link className="pill-button dark" href="/menu">Explore the menu <ArrowRight /></Link>
          <Link className="line-link" href="/story">Discover the story <ArrowDownRight /></Link>
        </div>
        <div className="home-facts"><span><b>Sold out</b> opening day</span><span><b>60</b> order capacity</span><span><b>₱7,515</b> Week 1 sales</span></div>
      </div>
      <div className="home-product">
        <div className="product-disc"><div className="hero-sandwich-float"><Image className="hero-real-sandwich" src="/products/plain.png" unoptimized alt="Plain Dropwich egg sandwich" width={1254} height={1254} priority /></div></div>
        <div className="hero-price"><b>₱89</b><small>2023 price</small></div>
      </div>
    </section>
    <section className="home-menu-preview">
      <header><h2>Made to stand<br />out of the box.</h2><Link href="/menu">See every option <ArrowRight /></Link></header>
      <div>{products.map(product => <article key={product.id} className={product.tone}>
        <Link className="product-card-link" href={`/menu/${product.id}`} aria-label={`Customize ${product.label}, ₱${product.price}`}>
          <ProductCardArt />
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
        <small>Hungarian Dropwich</small>
        <h2><span>Smoky.</span><span><em>Cheesy.</em></span><span>Unmistakable.</span></h2>
        <p>Our biggest sandwich pairs creamy egg and melted cheese with Hungarian sausage, wrapped in buttery toasted bread.</p>
        <Link className="pill-button dark" href="/menu">Build your order <ArrowRight /></Link>
      </div>
    </section>
    <HomeExperience />
    <section className="home-belief">
      <div><span>Eat</span><strong>better.</strong></div>
      <p>Shaped by customer feedback and improved through real selling.</p>
      <Link href="/story">Meet the team <ArrowDownRight /></Link>
    </section>
  </main>;
}
