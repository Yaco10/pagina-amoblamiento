import React from 'react';
import PriceRange from './PriceRange';

export type ProductFilters = {
  q: string;
  colors: string[];
  sizes: string[];
  price: { min: number; max: number };
};

type Props = {
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
    <aside className="w-full min-w-0">
      <div className="sticky top-4 min-w-0 p-4">
        <div className="mb-5">
          <p className="text-lg font-semibold text-[color:var(--color-brand-wood)]">Buscar</p>
          <label className=""></label>
          <input
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder="Ej: flotante, minimal..."
            aria-label="Buscar productos"
            className="mt-2 w-full rounded-2xl border border-[color:var(--color-brand-wood)]/10 bg-[color:var(--color-brand-base)]/72 px-4 py-3 text-[color:var(--color-brand-earth)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] outline-none placeholder:text-[color:var(--color-brand-coyote)]/72 transition-all duration-200 focus:border-[color:var(--color-brand-accent)]/40 focus:bg-[color:var(--color-brand-base)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand-accent)_10%,transparent)]"
          />
        </div>

        <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden pr-1">
          <section className="border-t border-[color:var(--color-brand-wood)]/10 pt-4">
            <p className="mb-3 text-base font-bold text-[color:var(--color-brand-wood)]">Precio</p>

            <PriceRange
              min={priceBounds.min}
              max={priceBounds.max}
              step={1000}
              value={[value.price.min, value.price.max]}
              onChange={([min, max]) => onChange({ ...value, price: { min, max } })}
            />
          </section>

          <section className="mt-5 border-t border-[color:var(--color-brand-wood)]/10 pt-4">
            <p className="mb-3 text-base font-bold text-[color:var(--color-brand-wood)]">Color</p>

            <div className="space-y-2">
              {availableColors.map((c) => {
                const checked = value.colors.includes(c);
                return (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1.5 select-none transition-colors duration-200 hover:bg-[color:var(--color-brand-surface)]/22"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange({ ...value, colors: toggle(value.colors, c) })}
                      className="peer sr-only"
                    />

                    <span
                      className="
      h-5 w-5 rounded-md
      border border-[color:var(--color-brand-wood)]/14
      grid place-items-center
      bg-[var(--color-brand-base)]
      shadow-[0_4px_10px_rgba(64,53,40,0.06)]
      transition-all duration-200
      peer-focus-visible:ring-4
      peer-focus-visible:ring-[color:var(--color-brand-accent)]/12
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
                        className="h-3 w-3 translate-y-[0.5px] text-white"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.418l-6.296 6.25-3.296-3.25a1 1 0 00-1.408 1.418l4 3.95a1 1 0 001.408 0l7-6.95z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="min-w-0 break-words text-[0.95rem] text-[color:var(--color-brand-earth)]">
                      {c}
                    </span>
                  </label>
                );
              })}

              {availableColors.length === 0 && (
                <p className="text-sm text-[color:var(--color-brand-coyote)]/80">
                  No hay colores cargados.
                </p>
              )}
            </div>
          </section>

          <section className="mt-5 border-t border-b border-[color:var(--color-brand-wood)]/10 py-4">
            <p className="mb-3 text-base font-bold text-[color:var(--color-brand-wood)]">Tamaño</p>

            <div className="space-y-2">
              {availableSizes.map((s) => {
                const checked = value.sizes.includes(s);
                return (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1.5 select-none transition-colors duration-200 hover:bg-[color:var(--color-brand-surface)]/22"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange({ ...value, sizes: toggle(value.sizes, s) })}
                      className="peer sr-only"
                    />

                    <span
                      className="
      h-5 w-5 rounded-md
      border border-[color:var(--color-brand-wood)]/14
      grid place-items-center
      bg-[var(--color-brand-base)]
      shadow-[0_4px_10px_rgba(64,53,40,0.06)]
      transition-all duration-200
      peer-focus-visible:ring-4
      peer-focus-visible:ring-[color:var(--color-brand-accent)]/12
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
                        className="h-3 w-3 translate-y-[0.5px] text-white"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.418l-6.296 6.25-3.296-3.25a1 1 0 00-1.408 1.418l4 3.95a1 1 0 001.408 0l7-6.95z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="min-w-0 break-words text-[0.95rem] text-[color:var(--color-brand-earth)]">
                      {s}
                    </span>
                  </label>
                );
              })}

              {availableSizes.length === 0 && (
                <p className="text-sm text-[color:var(--color-brand-coyote)]/80">
                  No hay tamaños cargados.
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={onClear} className="btn-ui-ghost my-4">
            Limpiar
          </button>
        </div>
      </div>
    </aside>
  );
}
