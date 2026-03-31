import {
  calculateFinalPrice,
  calculateInstallments,
  formatPrice,
} from '../../data/princingsUtils.ts';

export default function ProductCard({ product }) {
  if (!product) return null;

  const productHref = `/product/${product.slug}`;
  const cover = product.variants?.[0].images?.[0];
  const cover2 = product.variants?.[0].images?.[1];
  const inst = calculateInstallments(product.priceBase, product.installments);

  const hasDiscount = Boolean(product.discountPercentage);
  const finalPrice = hasDiscount
    ? calculateFinalPrice(product.priceBase, product.discountPercentage)
    : product.priceBase;

  return (
    <article className="w-full max-w-md overflow-hidden ">
      <a href={productHref} className="block group">
        <div className="relative aspect-[19/20] w-full overflow-hidden rounded-lg bg-[color:var(--color-brand-surface)]/40">
          {cover && (
            <img
              src={cover}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-[1.04]"
              loading="lazy"
            />
          )}
          {cover2 && (
            <img
              src={cover2}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-[1.04]"
              loading="lazy"
            />
          )}
        </div>
      </a>

      <div className="my-4">
        <a href={productHref} className="block">
          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-[color:var(--color-brand-earth)]">
            {product.title}
          </h2>
        </a>

        <p className="text-lg font-bold text-[color:var(--color-brand-wood)]">
          {formatPrice(finalPrice)}
        </p>

        {hasDiscount && (
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm line-through text-[color:var(--color-brand-coyote)]/80">
              {formatPrice(product.priceBase)}
            </p>
            <span className="rounded-full bg-[color:var(--color-brand-accent)] px-2 py-0.5 text-xs font-semibold text-[color:var(--color-brand-base)]">
              -{product.discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Cuotas */}
        {product.installments?.enabled && (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-[color:var(--color-brand-accent)]">
            <span className="font-medium">
              {inst.count} x {formatPrice(inst.perInstallment)}
            </span>
            {!inst.hasInterest && <span className="font-semibold">sin interés</span>}
          </div>
        )}
      </div>
    </article>
  );
}
