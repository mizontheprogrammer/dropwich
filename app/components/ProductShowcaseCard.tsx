import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPeso, type Product } from "../data";

type ProductShowcaseCardProps = {
  product: Product;
  index: number;
  showOrderDetails?: boolean;
};

export function ProductShowcaseCard({ product, index, showOrderDetails = false }: ProductShowcaseCardProps) {
  return (
    <article className={`product-showcase-card product-showcase-card-${product.tone}`}>
      <Link
        href={`/menu/${product.id}`}
        aria-label={`Customize ${product.label}${showOrderDetails ? `, ${formatPeso(product.price)}` : ""}`}
        className="product-showcase-link"
      >
        <div className="product-showcase-topline">
          <span>0{index + 1}</span>
          <span className="product-showcase-arrow" aria-hidden="true"><ArrowRight /></span>
        </div>

        <span className="product-showcase-disc" aria-hidden="true" />
        <span className="product-showcase-ring" aria-hidden="true" />

        <Image
          src={product.image}
          unoptimized
          alt={`${product.label} in Dropwich packaging`}
          sizes="(max-width: 767px) 100vw, 33vw"
          width={1254}
          height={1254}
          priority={index < 3}
          className={`product-showcase-image${product.id === "hungarian" ? " product-showcase-image-hungarian" : ""}`}
        />

        <div className="product-showcase-copy">
          <small>{product.short}</small>
          <h2>{product.label}</h2>
        </div>

        {showOrderDetails && (
          <footer className="product-showcase-footer">
            <b>{formatPeso(product.price)}</b>
            <strong>Pick your sauce <ArrowRight aria-hidden="true" /></strong>
          </footer>
        )}
      </Link>
    </article>
  );
}
