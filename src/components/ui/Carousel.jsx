import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel({ slides }) {
  const autoplay = useMemo(
    () =>
      Autoplay(
        { delay: 8000, stopOnInteraction: false, stopOnMouseEnter: false },
        (emblaRoot) => emblaRoot.parentElement
      ),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    });

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-md">
        {/* Container */}
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-full">
              <img
                src={s.src}
                alt={s.alt}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Flecha izquierda */}
      <button
        type="button"
        aria-label="Slide anterior"
        onClick={scrollPrev}
        disabled={!canPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/60 disabled:opacity-40"
      >
        {/* chevron left */}
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.78 15.53a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.47 4.47a.75.75 0 0 1 0 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Flecha derecha */}
      <button
        type="button"
        aria-label="Siguiente slide"
        onClick={scrollNext}
        disabled={!canNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/60 disabled:opacity-40"
      >
        {/* chevron right */}
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M7.22 4.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L11.69 10 7.22 5.53a.75.75 0 0 1 0-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: snapCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              i === selectedIndex ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
