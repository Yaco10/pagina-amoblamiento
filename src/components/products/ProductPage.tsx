import { useMemo, useState } from "react";
import { PRODUCTS, calculateFinalPrice } from "../../data/product";
import type { Product } from "../../data/product";
import { calculateInstallments, formatPrice } from "../../data/princingsUtils";
import ProductCarousel16x9 from "../ui/Carrousel/CarrouselProducts";

export default function ProductPage({ product }: { product: string }) {
  // 1) Encontrar producto primero y validar existencia
  const productObject = useMemo(
    () => PRODUCTS.find((p) => p.slug === product) as Product | undefined,
    [product],
  );

  if (!productObject) return <p>Cargando...</p>;

  const finalPrice = calculateFinalPrice(
    productObject.originalPrice,
    productObject.discountPercentage,
  );

  const inst = calculateInstallments(finalPrice, productObject.installments);

  const defaultColor = productObject.color?.[0] ?? "";
   const [selectedColor, setSelectedColor] = useState<string>(defaultColor);

  const waPhone = "549XXXXXXXXXX"; 

  const waMessage = useMemo(() => {
    const parts = [
      "Hola! Quiero consultar por:",
      productObject.title,
      selectedColor ? `| Color: ${selectedColor}` : "",
      `| Precio: ${formatPrice(finalPrice)}`,
    ].filter(Boolean);

    return parts.join(" ");
  }, [productObject.title, selectedColor, finalPrice]);

  const waLink = useMemo(() => {
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;
  }, [waPhone, waMessage]);

  return (
    <div className="flex flex-row p-4 gap-8 items-start">
      <div className="flex flex-col basis-[40%] overflow-hidden">
        <ProductCarousel16x9
      images={productObject.images}
      selectedColor={selectedColor}
    />
      </div>

      <div className="sticky top-[100px] flex flex-col basis-[60%] ">
        <h1 className="text-sm font-bold text-[color:var(--color-brand-wood)]/80">
          {productObject.title}
        </h1>

        <div className="flex flex-row items-center gap-2">
          <p className="text-3xl font-semibold">{formatPrice(finalPrice)}</p>

          {productObject.discountPercentage ? (
            <p className="text-xl text-[color:var(--color-brand-coyote)]/60 line-through">
              {formatPrice(productObject.originalPrice)}
            </p>
          ) : null}
        </div>

        <div className="text-emerald-600 border-b pb-2">
          {productObject.installments?.enabled ? (
            <p className="text-lg font-semibold">
              {productObject.installments.count} cuotas{" "}
              {!productObject.installments.hasInterest && "sin interés"} de{" "}
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
          <p>✓ Elaboracion a mano</p>
          <p>✓ Diseños Propios</p>
        </div>

        <h3 className="text-sm font-semibold pb-2">
          Color:{" "}
          <span className="font-normal text-zinc-600">
            {selectedColor ?? "Elegí un color"}
          </span>
        </h3>

        <div className="pb-4">
          {productObject.color?.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={
                color === selectedColor
                  ? "cursor-pointer p-3 mr-3 mb-2 rounded-lg bg-[color:var(--color-brand-wood)] text-white ring-2 ring-[color:var(--color-brand-wood)]"
                  : "cursor-pointer p-3 mr-3 mb-2 rounded-lg bg-[color:var(--color-brand-surface)] hover:ring-2 hover:ring-black/10"
              }
              aria-pressed={color === selectedColor}
            >
              {color}
            </button>
          ))}
        </div>

        <div className="pb-4">
          <p className="text-sm text-zinc-700">
            Stock disponible:{" "}
            <span className="text-[color:var(--color-brand-accent)] font-bold">
              {productObject.stock}
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
            ${!selectedColor ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
          aria-label="Consultar por WhatsApp"
          title={!selectedColor ? "Elegí un color para continuar" : "Consultar por WhatsApp"}
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}