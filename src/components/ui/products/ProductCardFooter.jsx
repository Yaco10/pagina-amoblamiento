function PriceFooter({ title, price }) {
  return (
    <div className="relative px-4 pb-4">
      {/* Fondo con forma (pastilla + mordida circular) */}
      <svg
        className="absolute inset-x-4 bottom-4 h-14 w-[calc(100%-2rem)]"
        viewBox="0 0 320 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Mask: blanco = visible, negro = recortado */}
          <mask id="pill-cutout">
            <rect width="320" height="64" rx="32" fill="white" />
            {/* “mordida” para el botón (ajusta cx/cy/r) */}
            <circle cx="284" cy="32" r="26" fill="black" />
          </mask>
        </defs>

        <rect
          width="320"
          height="64"
          rx="32"
          mask="url(#pill-cutout)"
          fill="white"
        />
      </svg>

      {/* Contenido encima */}
      <div className="relative h-14 flex items-center">
        <div className="pl-3 pr-14 leading-tight">
          <div className="text-sm font-semibold text-neutral-800">{title}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-neutral-900">{price}</span>
            {oldPrice && (
              <span className="text-xs text-neutral-400 line-through">{oldPrice}</span>
            )}
          </div>
        </div>

        {/* Botón en el hueco */}
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-neutral-200"
          aria-label="Add to cart"
        >
          🛍️
        </button>
      </div>
    </div>
  );
}