import React from "react";
import PriceRange from "../ui/PriceRange";

export type ProductFilters = {
  q: string;
  colors: string[];
  sizes: string[];
  price: { min: number; max: number };
};

type Props = {
  // listas disponibles (las puede calcular ProductsPage desde PRODUCTS)
  availableColors: string[];
  availableSizes: string[];
  priceBounds: { min: number; max: number };

  value: ProductFilters;
  onChange: (next: ProductFilters) => void;
  onClear: () => void;
};

function toggle(arr: string[], item: string) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function FiltersSidebar({
  availableColors,
  availableSizes,
  priceBounds,
  value,
  onChange,
  onClear,
}: Props) {
  return (
    <aside className="w-full lg:w-72">
      <div className="sticky top-4  p-4">
        {/* BUSCADOR */}
        <div className="mb-5">
          <p className="text-lg font-bold">Buscar</p>
          <label className=""></label>
          <input
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder="Ej: flotante, minimal..."
            className="w-full rounded-xl border-b border-black/15 px-3 py-2 outline-none focus:border-black/40"
          />
        </div>

        <div className="max-h-[70vh] overflow-auto pr-1">
          {/* PRECIO */}
          <section className="border-t border-black/10 pt-4">
            <p className="mb-3 text-base font-bold">Precio</p>

            <PriceRange
              min={priceBounds.min}
              max={priceBounds.max}
              step={1000}
              value={[value.price.min, value.price.max]}
              onChange={([min, max]) =>
                onChange({ ...value, price: { min, max } })
              }
            />
          </section>

          {/* COLOR */}
          <section className="mt-5 border-t border-black/10 pt-4">
            <p className="mb-3 text-base font-bold">Color</p>

            <div className="space-y-2">
              {availableColors.map((c) => {
                const checked = value.colors.includes(c);
                return (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-3 select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onChange({ ...value, colors: toggle(value.colors, c) })
                      }
                      className="peer sr-only"
                    />

                    <span
                      className="
      h-5 w-5 rounded-sm
      border border-[color:var(--color-brand-surface)]
      grid place-items-center
      bg-[var(--color-brand-base)]
      transition-colors duration-200
      peer-checked:bg-[var(--color-brand-wood)]
      peer-checked:border-[var(--color-brand-wood)]

      [&>svg]:opacity-0
      peer-checked:[&>svg]:opacity-100
      [&>svg]:transition-opacity
      [&>svg]:duration-200
    "
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3 w-3 text-white translate-y-[0.5px]"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.418l-6.296 6.25-3.296-3.25a1 1 0 00-1.408 1.418l4 3.95a1 1 0 001.408 0l7-6.95z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="text-sm">{c}</span>
                  </label>
                );
              })}

              {availableColors.length === 0 && (
                <p className="text-sm text-black/50">
                  No hay colores cargados.
                </p>
              )}
            </div>
          </section>

          {/* TAMAÑO */}
          <section className="mt-5 border-t border-b border-black/10 py-4">
            <h3 className="mb-3 text-base font-bold">Tamaño</h3>

            <div className="space-y-2">
              {availableSizes.map((s) => {
                const checked = value.sizes.includes(s);
                return (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-3 select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onChange({ ...value, sizes: toggle(value.sizes, s) })
                      }
                      className="peer sr-only"
                    />

                    <span
                      className="
      h-5 w-5 rounded-sm
      border border-[color:var(--color-brand-surface)]
      grid place-items-center
      bg-[var(--color-brand-base)]
      transition-colors duration-200
      peer-checked:bg-[var(--color-brand-wood)]
      peer-checked:border-[var(--color-brand-wood)]

      [&>svg]:opacity-0
      peer-checked:[&>svg]:opacity-100
      [&>svg]:transition-opacity
      [&>svg]:duration-200
    "
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3 w-3 text-white translate-y-[0.5px]"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.418l-6.296 6.25-3.296-3.25a1 1 0 00-1.408 1.418l4 3.95a1 1 0 001.408 0l7-6.95z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="text-sm">{s}</span>
                  </label>
                );
              })}

              {availableSizes.length === 0 && (
                <p className="text-sm text-black/50">
                  No hay tamaños cargados.
                </p>
              )}
            </div>
          </section>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-black/60 hover:text-black my-4 cursor-pointer"
          >
            Limpiar
          </button>
        </div>
      </div>
    </aside>
  );
}
