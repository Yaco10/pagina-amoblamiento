import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, calculateFinalPrice } from '../../data/product';
import type { ColorMelamina, MobelSize, Product, ProductVariant } from '../../data/product';
import { calculateInstallments, formatPrice } from '../../data/princingsUtils';
import ProductCarousel16x9 from './ui/CarrouselProducts';
import ProductAccordion from './ui/ProductAccordion';

export default function ProductPage({ product }: { product: string }) {
  const productObject = useMemo(
    () => PRODUCTS.find((p) => p.slug === product) as Product | undefined,
    [product],
  );

  console.log('elproductolke', productObject?.description);

  if (!productObject) return <p>Cargando...</p>;

  const defaultVariant =
    productObject.variants.find((v) => v.stock > 0) ??
    (productObject.variants[0] as ProductVariant);

  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant.id);

  const selectedVariant = useMemo(
    () => productObject.variants.find((v) => v.id == selectedVariantId) ?? defaultVariant,
    [defaultVariant, selectedVariantId, productObject.variants],
  );

  const availableColors = useMemo<ColorMelamina[]>(
    () => Array.from(new Set(productObject?.variants.map((v) => v.color) ?? [])),
    [productObject?.variants],
  );

  const availableSizes = useMemo<MobelSize[]>(
    () => Array.from(new Set(productObject?.variants.map((v) => v.sizeCategory))),
    [productObject?.variants],
  );

  const selectedColor = selectedVariant.color as ColorMelamina;
  const selectedSize = selectedVariant.sizeCategory as MobelSize;

  useEffect(() => {
    setSelectedVariantId(defaultVariant.id);
  }, [productObject.id]);

  const trySelect = (color: ColorMelamina, size: MobelSize) => {
    const match = productObject.variants.find((v) => v.color == color && v.sizeCategory == size);
    if (match) {
      setSelectedVariantId(match.id);
      return;
    }
  };

  const isColorEnabled = (color: ColorMelamina) =>
    !!productObject.variants.find((v) => v.color == color && v.sizeCategory == selectedSize);
  const isSizeEnabled = (size: MobelSize) =>
    !!productObject.variants.find((v) => v.color == selectedColor && v.sizeCategory == size);

  const finalPrice = calculateFinalPrice(selectedVariant.price, productObject.discountPercentage);

  const inst = calculateInstallments(finalPrice, productObject.installments);

  const waPhone = '549XXXXXXXXXX';

  const waMessage = useMemo(() => {
    const parts = [
      'Hola! Quiero consultar por:',
      productObject.title,
      selectedColor ? `| Color: ${selectedColor}` : '',
      `| Precio: ${formatPrice(finalPrice)}`,
    ].filter(Boolean);

    return parts.join(' ');
  }, [productObject.title, selectedColor, finalPrice]);

  const waLink = useMemo(() => {
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;
  }, [waPhone, waMessage]);

  return (
    <>
      <h1 className="text-base font-bold text-[color:var(--color-brand-wood)]/80 pt-2 pl-4 lg:hidden">
        {productObject.title}
      </h1>
      <div className="flex flex-col p-2 gap-8 items-start lg:flex-row">
        <div className="flex flex-col overflow-hidden w-full lg:basis-[40%] ">
          <ProductCarousel16x9 images={selectedVariant.images} product={productObject} />
        </div>

        <div className="sticky top-[100px] flex flex-col w-full lg:basis-[60%]">
          <h1 className="hidden text-sm font-bold text-[color:var(--color-brand-wood)]/80 lg:block">
            {productObject.title}
          </h1>

          <div className="flex flex-row items-center gap-2">
            <p className="text-3xl font-semibold">{formatPrice(finalPrice)}</p>

            {productObject.discountPercentage ? (
              <p className="text-xl text-[color:var(--color-brand-coyote)]/60 line-through">
                {formatPrice(selectedVariant.price)}
              </p>
            ) : null}
          </div>

          <div className="text-emerald-600 border-b pb-2">
            {productObject.installments?.enabled ? (
              <p className="text-lg font-semibold">
                {productObject.installments.count} cuotas{' '}
                {!productObject.installments.hasInterest && 'sin interés'} de{' '}
                <span className="font-bold">{formatPrice(inst.perInstallment)}</span>
              </p>
            ) : null}
          </div>

          <div className="pt-3 pb-4">
            <div className="text-emerald-600 flex flex-row gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="m24,10.5c0-3.033-2.468-5.5-5.5-5.5h-1.5v-.5c0-1.93-1.57-3.5-3.5-3.5H3.5C1.57,1,0,2.57,0,4.5v2.5h3v-2.5c0-.276.224-.5.5-.5h10c.275,0,.5.224.5.5v12.5H3v-3H0v6h3.061c-.034.162-.061.327-.061.5,0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5c0-.173-.027-.338-.061-.5h8.122c-.034.162-.061.327-.061.5,0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5c0-.173-.027-.338-.061-.5h3.061v-9.5Zm-5.5-2.5c1.379,0,2.5,1.122,2.5,2.5v2.5h-4v-5h1.5Zm-11.5,4H0v-3h7v-3l3.707,3.793c.39.391.39,1.024,0,1.414l-3.707,3.793v-3Z" />
              </svg>

              <p className="text-base font-semibold">
                Coordinamos tu envío por <span className="font-bold">WhatsApp</span>
              </p>
            </div>
            <p className="text-sm text-zinc-600">Envíos a todo el país</p>
          </div>

          <div className="flex flex-col gap-1 pb-4 text-sm text-zinc-600">
            <p>✓ Elaboración Artesanal</p>
            <p>✓ Diseños Propios</p>
          </div>

          <h3 className="text-sm font-semibold pb-2">
            Color:{' '}
            <span className="font-normal text-zinc-600">{selectedColor ?? 'Elegí un color'}</span>
          </h3>

          <div className="pb-4">
            {availableColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => trySelect(color, selectedSize)}
                className={`
  cursor-pointer p-3 mr-3 mb-2 rounded-lg
  ${
    color === selectedColor
      ? 'bg-[color:var(--color-brand-wood)] text-white ring-2 ring-[color:var(--color-brand-wood)]'
      : 'bg-[color:var(--color-brand-surface)] hover:ring-2 hover:ring-black/10'
  }
  ${!isColorEnabled(color) ? 'opacity-50 cursor-not-allowed hover:ring-0' : ''}
`}
                aria-pressed={color === selectedColor}
              >
                {color}
              </button>
            ))}
          </div>

          <div className="pb-4">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => trySelect(selectedColor, size)}
                className={`
  cursor-pointer p-3 mr-3 mb-2 rounded-lg
  ${
    size === selectedSize
      ? 'bg-[color:var(--color-brand-wood)] text-white ring-2 ring-[color:var(--color-brand-wood)]'
      : 'bg-[color:var(--color-brand-surface)] hover:ring-2 hover:ring-black/10'
  }
  ${!isSizeEnabled(size) ? 'opacity-50 cursor-not-allowed hover:ring-0' : ''}
`}
                aria-pressed={size === selectedSize}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="pb-4">
            <p className="text-sm text-zinc-700">
              Stock disponible:{' '}
              <span className="text-[color:var(--color-brand-accent)] font-bold">
                {selectedVariant.stock}
              </span>
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2
            bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
            text-white font-semibold text-[15px] md:text-base
            py-3 px-6
            rounded-xl shadow-sm
            transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
            select-none
            ${!selectedColor ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
            aria-label="Consultar por WhatsApp"
            title={!selectedColor ? 'Elegí un color para continuar' : 'Consultar por WhatsApp'}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
      <ProductAccordion product={productObject} variant={selectedVariant} />
    </>
  );
}
