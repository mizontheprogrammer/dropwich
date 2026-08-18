import { notFound } from "next/navigation";
import { products, ProductId } from "../../data";
import { ProductCustomizer } from "../ProductCustomizer";

export function generateStaticParams() {
  return products.map(product => ({ product: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;

  if (!products.some(item => item.id === product)) notFound();

  return <ProductCustomizer initialProduct={product as ProductId} />;
}
