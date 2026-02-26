export type ProductCategory =
  | "Cocina"
  | "Living"
  | "Dormitorio"
  | "Baño"
  | "Comedor"
  | "Oficina"
  | "Otros";

export type ColorMelamina =
  | "Black"
  | "White";

  export type MobelSize =
  | "Chico"
  | "Mediano"
  | "Grande";

export type InstallmentPlan = {
  enabled: boolean;          // si ofrece cuotas
  count: number;             // cantidad de cuotas (ej: 3, 6, 12)
  hasInterest: boolean;      // con interés o sin interés
  monthlyInterestRate?: number; // ej: 0.05 = 5% mensual (solo si hasInterest)
};

export type Product = {
  id: string;
  slug: string;

  title: string;
  description: string;
  shortDescription: string;

  originalPrice: number;
  discountPercentage?: number;

  category: ProductCategory[];

  images: string[];
  color: ColorMelamina[];
  size: MobelSize[];
  tags?: string[];
  featured?: boolean;
  stock?: number;

  installments?: InstallmentPlan; // ✅ cuotas opcionales
};

export const calculateFinalPrice = (
  originalPrice: number,
  discountPercentage?: number
) => {
  if (!discountPercentage) return originalPrice;

  return Math.round(
    originalPrice - (originalPrice * discountPercentage) / 100
  );
};


export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "mueble-tv-flotante",
    title: "Mueble TV flotante",
    category: ["Living"],
    shortDescription:
      "Minimal, suspendido, con guardado. Terminación premium.",
    description:
      "Mueble flotante con opciones de puertas push y pasacables.",
    originalPrice: 220000,
    discountPercentage: 15,
    images: ["/images/products/mesaluz01-01.jpg", "/images/products/mesaluz01-02.jpg"],
    color: ["Black"],
    size: ["Chico"],
    tags: ["minimal", "flotante"],
    featured: true,
    stock: 5,
  },
  {
    id: "p-002",
    slug: "bajo-mesada-nordico",
    title: "Bajo mesada nórdico",
    category: ["Cocina"],
    shortDescription: "Diseño moderno adaptable a tus medidas.",
    description: "Bajo mesada configurable con cajones y puertas.",
    originalPrice: 240000,
    images: ["/images/products/01-mesaluz01-white-01.jpg", "/images/products/01-mesaluz01-white-02.jpg","/images/products/01-mesaluz01-black-01.jpg","/images/products/01-mesaluz01-black-02.jpg"],
    color: ["White", "Black"],
    size: ["Chico"],
    tags: ["a medida", "nordico"],
    stock: 3,
  },
  {
    id: "p-003",
    slug: "placard-moderno",
    title: "Placard moderno 3 puertas",
    category: ["Dormitorio"],
    shortDescription: "Amplio y personalizable.",
    description:
      "Placard con interior configurable y herrajes premium.",
    originalPrice: 470000,
    discountPercentage: 10,
    images: ["/products/placard/1.jpg", "/products/placard/2.jpg"],
    color: ["Black"],
    size: ["Chico"],
    tags: ["placard", "moderno"],
    featured: true,
    stock: 2,
  },

  // NUEVOS CON CUOTAS

  {
    id: "p-004",
    slug: "escritorio-industrial",
    title: "Escritorio industrial hierro y madera",
    category: ["Oficina"],
    shortDescription:
      "Estructura reforzada, ideal para home office.",
    description:
      "Escritorio con estructura de hierro pintado y tapa de madera. Medidas y terminación personalizables.",
    originalPrice: 180000,
    discountPercentage: 5,
    images: ["/products/escritorio/1.jpg", "/products/escritorio/2.jpg"],
    color: ["White"],
    size: ["Mediano"],
    tags: ["industrial", "home office"],
    stock: 8,
    installments: {
      enabled: true,
      count: 6,
      hasInterest: false, // sin interés
    },
  },
  {
    id: "p-005",
    slug: "biblioteca-modular",
    title: "Biblioteca modular abierta",
    category: ["Cocina"],
    shortDescription:
      "Modular, adaptable a distintos espacios.",
    description:
      "Biblioteca con módulos combinables. Ideal para separar ambientes o decorar livings modernos.",
    originalPrice: 260000,
    discountPercentage: 12,
    images: ["/products/biblioteca/1.jpg", "/products/biblioteca/2.jpg"],
    color: ["Black"],
    size: ["Chico"],
    tags: ["biblioteca", "modular"],
    featured: true,
    stock: 4,
    installments: {
      enabled: true,
      count: 3,
      hasInterest: false, // sin interés
    },
  },
  {
    id: "p-006",
    slug: "mesa-comedor-roble",
    title: "Mesa comedor roble macizo",
    category: ["Baño"],
    shortDescription:
      "Robusta, premium, a medida.",
    description:
      "Mesa de comedor en madera maciza con terminación protectora. Se fabrica en distintas medidas y tonos.",
    originalPrice: 520000,
    images: ["/products/mesa/1.jpg", "/products/mesa/2.jpg"],
    color: ["Black"],
    size: ["Chico"],
    tags: ["madera maciza", "premium"],
    stock: 1,
    installments: {
      enabled: true,
      count: 12,
      hasInterest: true, // con interés
      monthlyInterestRate: 0.05, // 5% mensual
    },
  },
]