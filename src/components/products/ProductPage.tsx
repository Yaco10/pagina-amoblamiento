import React, { useMemo, useState } from "react";
import FiltersSidebar from "./FiltersSidebar.tsx"
import type { ProductFilters } from "./FiltersSidebar.tsx"
import ProductGrid from "./ProductGrid.tsx"
import { PRODUCTS } from "../../data/product.ts";

type AnyProduct = any;

function uniqueStrings(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter(Boolean))) as string[];
}

const SLUG_TO_CATEGORY: Record<string, string | "all"> = {
  all: "all",
  bano: "Baño",
  baño: "Baño",
  cocina: "Cocina",
  comedor: "Comedor",
  Oficina: "Oficina",
  dormitorio: "Dormitorio",
  living: "Living",
};

function normalizeCategory(slug?: string) {
  const key = (slug ?? "all").toLowerCase();
  return SLUG_TO_CATEGORY[key] ?? "all";
}

type Props = {
  category?: string; // viene desde Astro: "bano", "cocina", "all"
};

export default function ProductsPage({ category }: Props) {
  const categoryName = useMemo(() => normalizeCategory(category), [category]);

  // bounds reales por productos (podés hacerlo sobre todos o sobre la categoría)
  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map((p: AnyProduct) => p.originalPrice).filter(
      (n: any) => typeof n === "number"
    ) as number[];
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 100000;
    return { min, max };
  }, []);

  const availableColors = useMemo(
    () => uniqueStrings(PRODUCTS.map((p: AnyProduct) => p.color)),
    []
  );
  const availableSizes = useMemo(
    () => uniqueStrings(PRODUCTS.map((p: AnyProduct) => p.size)),
    []
  );

  const [filters, setFilters] = useState<ProductFilters>({
    q: "",
    colors: [],
    sizes: [],
    price: { ...priceBounds },
  });

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();

    return PRODUCTS.filter((p: AnyProduct) => {
      // ✅ categoria (desde Astro)
      console.log(categoryName)
      const okCategory = categoryName === "all" ? true : p.category.includes(categoryName);;

      // texto
      const haystack = [
        p.title,
        p.shortDescription,
        p.description,
        ...(p.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const okQ = q ? haystack.includes(q) : true;

      // color / size
      const okColor = filters.colors.length ? filters.colors.includes(p.color) : true;
      const okSize = filters.sizes.length ? filters.sizes.includes(p.size) : true;

      // precio
      const price = p.originalPrice ?? 0;
      const okPrice = price >= filters.price.min && price <= filters.price.max;

      return okCategory && okQ && okColor && okSize && okPrice;
    });
  }, [filters, categoryName]);

  return (
    <div className="grid w-full grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
      <FiltersSidebar
        availableColors={availableColors}
        availableSizes={availableSizes}
        priceBounds={priceBounds}
        value={filters}
        onChange={setFilters}
        onClear={() =>
          setFilters({
            q: "",
            colors: [],
            sizes: [],
            price: { ...priceBounds },
          })
        }
      />
       <div>
         <div className="mb-2 text-sm text-black/60">
          Categoría:{" "}
          <span className="font-semibold text-black">
            {categoryName === "all" ? "Todas" : categoryName}
          </span>
        </div>

        <div className="mb-4 text-sm text-black/60">
          Resultados:{" "}
          <span className="font-semibold text-black">{filtered.length}</span>
        </div>
        <ProductGrid products={filtered} />
       </div>
    </div>
  );
}