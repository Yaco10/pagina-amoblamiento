import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((p) => (
        <ProductCard key={p.id ?? p.slug} product={p} />
      ))}
    </div>
  );
}
