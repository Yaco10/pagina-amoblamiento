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
      <div className="sticky top-4 rounded-2xl border border-black/10 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filtros</h2>

          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-black/60 hover:text-black"
          >
            Limpiar
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-black/80">
            Buscar
          </label>
          <input
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder="Ej: flotante, minimal..."
            className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:border-black/40"
          />
        </div>

        <div className="max-h-[70vh] overflow-auto pr-1">
          {/* PRECIO */}
          <section className="border-t border-black/10 pt-4">
            <h3 className="mb-3 text-base font-bold">Precio</h3>

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
            <h3 className="mb-3 text-base font-bold">Color</h3>

            <div className="space-y-2">
              {availableColors.map((c) => {
                const checked = value.colors.includes(c);
                return (
                  <label key={c} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onChange({ ...value, colors: toggle(value.colors, c) })
                      }
                      className="h-4 w-4 rounded border-black/30"
                    />

                    <span className="text-sm">{c}</span>
                  </label>
                );
              })}

              {availableColors.length === 0 && (
                <p className="text-sm text-black/50">No hay colores cargados.</p>
              )}
            </div>
          </section>

          {/* TAMAÑO */}
          <section className="mt-5 border-t border-black/10 pt-4">
            <h3 className="mb-3 text-base font-bold">Tamaño</h3>

            <div className="space-y-2">
              {availableSizes.map((s) => {
                const checked = value.sizes.includes(s);
                return (
                  <label key={s} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onChange({ ...value, sizes: toggle(value.sizes, s) })
                      }
                      className="h-4 w-4 rounded border-black/30"
                    />
                    <span className="text-sm">{s}</span>
                  </label>
                );
              })}

              {availableSizes.length === 0 && (
                <p className="text-sm text-black/50">No hay tamaños cargados.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}