import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ProductCarouselProps = {
  images: string[];
  selectedColor?: string | null;
};

function imagesByColor(images: string[], color: string) {
  const getNum = (url: string) => {
    const match = url.match(/-(\d+)(?:\.\w+)?$/);
    return match ? Number(match[1]) : 0;
  };

  const filtered = images
    .filter((url) => url.toLowerCase().includes(`-${color.toLowerCase()}-`))
    .sort((a, b) => getNum(a) - getNum(b));

  return filtered.length > 0 ? filtered : images.sort((a, b) => getNum(a) - getNum(b));
}

export default function ProductCarousel19x9({ images, selectedColor }: ProductCarouselProps) {
  const filteredImages = useMemo(() => {
    if (!selectedColor) return images;
    return imagesByColor(images, selectedColor);
  }, [images, selectedColor]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, filteredImages.length, selectedColor]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (!filteredImages.length) return null;

  return (
    <div className="w-full">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden rounded-2xl bg-[color:var(--color-brand-surface)]">
          <div className="flex">
            {filteredImages.map((src, i) => (
              <div key={src + i} className="flex-[0_0_100%]">
                {/* ✅ Viewport 19:9 */}
                <div className="relative w-full aspect-[12/16] overflow-hidden bg-[color:var(--color-brand-surface)]">
                  {/* ✅ ocupa todo el ancho: cover */}
                  <img
                    src={src}
                    alt={`Producto ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white cursor-pointer"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white cursor-pointer"
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Miniaturas (también 19:9 pero más chicas) */}
      {filteredImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {filteredImages.map((src, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={src + i}
                onClick={() => scrollTo(i)}
                className={[
                  "shrink-0 overflow-hidden rounded-xl border transition",
                  active ? "border-black" : "border-gray-200 hover:border-gray-400",
                ].join(" ")}
              >
                <div className="relative aspect-[12/16] w-28 overflow-hidden bg-[color:var(--color-brand-surface)] cursor-pointer">
                  <img
                    src={src}
                    alt={`Miniatura ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}