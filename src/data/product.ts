export type ProductCategory =
  | "Cocina"
  | "Living"
  | "Dormitorio"
  | "Baño"
  | "Oficina"
  | "Otros";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  images: string[];
  tags?: string[];
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "mueble-tv-flotante",
    title: "Mueble TV flotante",
    category: "Living",
    shortDescription: "Minimal, suspendido, con guardado. Terminación premium.",
    description:
      "Mueble flotante con opciones de puertas push, estantes internos y pasacables. Se fabrica a medida.",
    images: ["/products/tv/1.jpg", "/products/tv/2.jpg"],
    tags: ["minimal", "flotante"],
    featured: true,
  },
  {
    id: "p-002",
    slug: "bajo-mesada-nordico",
    title: "Bajo mesada nórdico",
    category: "Cocina",
    shortDescription: "Diseño moderno adaptable a tus medidas y necesidades.",
    description:
      "Bajo mesada a medida. Posibilidad de configurar cajones, puertas, herrajes y terminaciones.",
    images: ["/products/bajo/1.jpg", "/products/bajo/2.jpg"],
    tags: ["a medida", "nordico"],
  },
];
