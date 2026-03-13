import React, { useMemo, useState } from 'react';
import FiltersSidebar from './ui/FiltersSidebar.tsx';
import ProductGrid from './ProductsGrid.tsx';
import { PRODUCTS } from '../../data/product.ts';
import type { ProductFilters } from './ui/FiltersSidebar.tsx';
import type { Product, ProductCategory, ProductVariant } from '../../data/product.ts';

type AnyProduct = any;

function uniqueStrings(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter(Boolean))) as string[];
}

const SLUG_TO_CATEGORY: Record<string, string | 'all'> = {
  all: 'all',
  bano: 'Baño',
  baño: 'Baño',
  cocina: 'Cocina',
  comedor: 'Comedor',
  Oficina: 'Oficina',
  dormitorio: 'Dormitorio',
  living: 'Living',
};

function normalizeCategory(slug?: string) {
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
    console.log('precios', prices);
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
      <div className="grid w-full grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[280px_1fr] min-h-[100vh]">
        <div className="hidden lg:block">
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
        <div>
          <div className="mb-2 text-sm text-black/60">
            Categoría:{' '}
            <span className="font-semibold text-black">
              {categoryName === 'all' ? 'Todas' : categoryName}
            </span>
          </div>

          <div className="mb-4 text-sm text-black/60">
            Resultados: <span className="font-semibold text-black">{filtered.length}</span>
          </div>
          <ProductGrid products={filtered} />
        </div>
        <button
          onClick={() => {
            setOpenFilters(true);
          }}
          className="fixed bottom-0 left-0 w-full h-10 text-center items-center justify-center bg-(--color-brand-surface)/80 tracking-[0.25em] font-bold lg:hidden "
        >
          AGREGAR UN FILTRO
        </button>
      </div>
      <div
        className={`z-100 fixed top-0 right-0 h-full w-[80%] bg-(--color-brand-base) ${openFilters ? `translate-x-0` : `translate-x-full`} transform transition-all duration-500 ease-in-out lg:hidden`}
      >
        <div className="flex flex-row items-center justify-between w-full p-4 border-b-1 ">
          <h1 className="text-sm text-center font-semibold">FILTRAR POR COLOR O TAMAÑO</h1>
          <button onClick={() => setOpenFilters(false)} className="text-xl font-semibold">
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
        className={`z-70 fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          openFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}
