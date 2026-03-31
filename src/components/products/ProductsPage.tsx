import React, { useMemo, useState } from 'react';
import FiltersSidebar from './ui/FiltersSidebar.tsx';
import ProductGrid from './ProductsGrid.tsx';
import { PRODUCTS } from '../../data/product.ts';
import type { ProductFilters } from './ui/FiltersSidebar.tsx';
import type { Product, ProductCategory, ProductVariant } from '../../data/product.ts';

function uniqueStrings(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter(Boolean))) as string[];
}

const SLUG_TO_CATEGORY: Record<string, ProductCategory | 'all'> = {
  all: 'all',
  bano: 'Baño',
  baño: 'Baño',
  cocina: 'Cocina',
  comedor: 'Comedor',
  oficina: 'Oficina',
  dormitorio: 'Dormitorio',
  living: 'Living',
};

function normalizeCategory(slug?: string): ProductCategory | 'all' {
  const key = (slug ?? 'all').toLowerCase();
  return SLUG_TO_CATEGORY[key] ?? 'all';
}

type Props = {
  category?: string;
};

export default function ProductsPage({ category }: Props) {
  const categoryName = useMemo(() => normalizeCategory(category), [category]);

  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.flatMap((p: Product) => p.variants)
      .map((v: ProductVariant) => v.price)
      .filter((n: any) => typeof n === 'number') as number[];
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 100000;
    return { min, max };
  }, []);

  const availableColors = useMemo(
    () => uniqueStrings(PRODUCTS.flatMap((p) => p.variants).map((c) => c.color)),
    [],
  );

  const availableSizes = useMemo(
    () => uniqueStrings(PRODUCTS.flatMap((p) => p.variants).map((s) => s.sizeCategory)),
    [],
  );

  const [filters, setFilters] = useState<ProductFilters>({
    q: '',
    colors: [],
    sizes: [],
    price: { ...priceBounds },
  });

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();

    return PRODUCTS.filter((p: Product) => {
      const okCategory = categoryName === 'all' ? true : p.category.includes(categoryName);

      const haystack = [p.title, p.shortDescription, p.description, ...(p.tags ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const okQ = q ? haystack.includes(q) : true;

      const okColor = filters.colors.length
        ? p.variants.some((v) => filters.colors.includes(v.color))
        : true;
      const okSize = filters.sizes.length
        ? p.variants.some((v) => filters.sizes.includes(v.sizeCategory))
        : true;

      const price = Math.min(...p.variants.flatMap((v) => v.price)) ?? 0;
      const okPrice = price >= filters.price.min && price <= filters.price.max;

      return okCategory && okQ && okColor && okSize && okPrice;
    });
  }, [filters, categoryName]);

  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      <div className="grid min-h-[100vh] w-full grid-cols-1 gap-6 overflow-x-clip px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden min-w-0 lg:block">
          <FiltersSidebar
            availableColors={availableColors}
            availableSizes={availableSizes}
            priceBounds={priceBounds}
            value={filters}
            onChange={setFilters}
            onClear={() =>
              setFilters({
                q: '',
                colors: [],
                sizes: [],
                price: { ...priceBounds },
              })
            }
          />
        </div>

        <div className="min-w-0">
          <div className="mb-2 text-sm text-[color:var(--color-brand-coyote)]/90">
            Categoria:{' '}
            <span className="font-semibold text-[color:var(--color-brand-wood)]">
              {categoryName === 'all' ? 'Todas' : categoryName}
            </span>
          </div>

          <div className="mb-4 text-sm text-[color:var(--color-brand-coyote)]/90">
            Resultados:{' '}
            <span className="font-semibold text-[color:var(--color-brand-wood)]">
              {filtered.length}
            </span>
          </div>

          <ProductGrid products={filtered} />
        </div>

        <button
          onClick={() => {
            setOpenFilters(true);
          }}
          className="btn-ui-floating-bar fixed right-4 bottom-4 left-4 z-40 justify-center lg:hidden"
        >
          AGREGAR UN FILTRO
        </button>
      </div>

      <div
        className={`z-100 fixed top-0 right-0 h-full w-[80%] max-w-full overflow-x-hidden bg-(--color-brand-base) ${openFilters ? 'translate-x-0' : 'translate-x-full'} transform transition-all duration-500 ease-in-out lg:hidden`}
      >
        <div className="flex w-full flex-row items-center justify-between border-b border-[color:var(--color-brand-wood)]/10 p-4">
          <h1 className="text-sm text-center font-semibold text-[color:var(--color-brand-wood)]">
            FILTRAR POR COLOR O TAMAÑO
          </h1>
          <button
            onClick={() => setOpenFilters(false)}
            aria-label="Cerrar filtros"
            className="inline-flex h-10 w-10 items-center justify-center text-xl font-semibold text-brand-wood/90 transition-colors duration-200 hover:text-brand-wood"
          >
            &times;
          </button>
        </div>

        <FiltersSidebar
          availableColors={availableColors}
          availableSizes={availableSizes}
          priceBounds={priceBounds}
          value={filters}
          onChange={setFilters}
          onClear={() =>
            setFilters({
              q: '',
              colors: [],
              sizes: [],
              price: { ...priceBounds },
            })
          }
        />
      </div>

      <div
        className={`z-70 fixed inset-0 bg-[color:var(--color-brand-earth)]/40 transition-opacity duration-300 ${
          openFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}
