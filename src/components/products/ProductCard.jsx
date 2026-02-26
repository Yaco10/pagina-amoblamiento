import { calculateFinalPrice, calculateInstallments, formatPrice } from "../../data/princingsUtils.ts";

export default function ProductCard({ product }) {
  if (!product) return null;

  const cover = product.images?.[0];
  const cover2 = product.images?.[1];
  const inst = calculateInstallments(product.originalPrice, product.installments);

  const hasDiscount = Boolean(product.discountPercentage);
  const finalPrice = hasDiscount
    ? calculateFinalPrice(product.originalPrice, product.discountPercentage)
    : product.originalPrice;

  return (
    <article className="w-full max-w-md overflow-hidden ">
      
      <a href={`/product/${product.slug}`} className="block group">
        <div className="relative aspect-[19/20] w-full overflow-hidden bg-black/5 rounded-sm">
          {cover && (
            <img
              src={cover}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-900 ease-in-out group-hover:opacity-0 group-hover:scale-110"
              loading="lazy"
            />
          )}
          {cover2 && (
            <img
              src={cover2}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-900 ease-in-out group-hover:opacity-100 group-hover:scale-110"
              loading="lazy"
            />
            )
          }
        </div>
      </a>

      <div className="my-4">
        <a href={product.slug} className="block">
          <h2 className="line-clamp-2 text-base font-semibold leading-snug">
            {product.title}
          </h2>
        </a>

        <p className="text-lg font-bold">
          {formatPrice(finalPrice)}
        </p>

        {hasDiscount && (
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-black/60 line-through">
              {formatPrice(product.originalPrice)}
            </p>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
              -{product.discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Cuotas */}
        {product.installments?.enabled && (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-emerald-600">
            <span className="font-medium">
              {inst.count} x {formatPrice(inst.perInstallment)}
            </span>
            {!inst.hasInterest && (
              <span className="font-semibold">
                sin interés
              </span>
            )}
          </div>
        )}

      </div>
    </article>
  );
}