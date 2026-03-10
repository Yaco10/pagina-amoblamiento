export type ProductCategory =
  | 'Cocina'
  | 'Living'
  | 'Dormitorio'
  | 'Baño'
  | 'Comedor'
  | 'Oficina'
  | 'Otros';

export type ColorMelamina = 'Black' | 'White';

export type MobelSize = 'Chico' | 'Mediano' | 'Grande';

type RealSize = {
  ancho: number;
  alto: number;
  profundidad: number;
};

export type InstallmentPlan = {
  enabled: boolean; // si ofrece cuotas
  count: number; // cantidad de cuotas (ej: 3, 6, 12)
  hasInterest: boolean; // con interés o sin interés
  monthlyInterestRate?: number; // ej: 0.05 = 5% mensual (solo si hasInterest)
};

export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  sizeCategory: string;
  realSize: RealSize;
  stock: number;
  price: number; // precio de esa variante
  images: string[];
};

export type Product = {
  id: string;
  slug: string;

  title: string;
  description: string;
  shortDescription: string;

  category: ProductCategory[];

  priceBase: number;
  discountPercentage?: number; // ← lo que ya tenías

  variants: ProductVariant[];

  featured?: boolean;
  tags?: string[];

  installments?: InstallmentPlan;
};

export const calculateFinalPrice = (originalPrice: number, discountPercentage?: number) => {
  if (!discountPercentage) return originalPrice;

  return Math.round(originalPrice - (originalPrice * discountPercentage) / 100);
};

export const PRODUCTS: Product[] = [
  {
    id: 'p-001',
    slug: 'bajo-mesada-linea',
    title: 'Bajo Mesada Línea',
    description:
      'Bajo mesada de melamina con puertas y estante interno. Ideal para cocina, fácil de limpiar y combinar.',
    shortDescription: 'Bajo mesada de melamina con puertas.',
    category: ['Cocina'],

    priceBase: 129900,
    discountPercentage: 10,

    featured: true,
    tags: ['bajo mesada', 'cocina', 'melamina'],

    installments: {
      enabled: true,
      count: 6,
      hasInterest: false,
    },

    variants: [
      {
        id: 'v-001-1',
        sku: 'BM-LIN-CHI-WHT',
        color: 'White',
        sizeCategory: 'Chico',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 6,
        price: 129900,
        images: [
          '/images/products/01-mesaluz01-white-01.jpg',
          '/images/products/01-mesaluz01-white-02.jpg',
        ],
      },
      {
        id: 'v-001-2',
        sku: 'BM-LIN-CHI-BLK',
        color: 'Black',
        sizeCategory: 'Chico',
        realSize: { ancho: 5, alto: 2, profundidad: 3 },
        stock: 2,
        price: 134900,
        images: [
          '/images/products/01-mesaluz01-black-01.jpg',
          '/images/products/01-mesaluz01-black-02.jpg',
        ],
      },
      {
        id: 'v-001-3',
        sku: 'BM-LIN-MED-WHT',
        color: 'White',
        sizeCategory: 'Mediano',
        realSize: { ancho: 2, alto: 4, profundidad: 3 },
        stock: 4,
        price: 149900,
        images: [
          '/products/bajo-mesada-linea/white-mediano-1.jpg',
          '/products/bajo-mesada-linea/white-mediano-2.jpg',
        ],
      },
      {
        id: 'v-001-4',
        sku: 'BM-LIN-GRA-WHT',
        color: 'White',
        sizeCategory: 'Grande',
        realSize: { ancho: 12, alto: 32, profundidad: 10 },
        stock: 1,
        price: 169900,
        images: [
          '/products/bajo-mesada-linea/white-grande-1.jpg',
          '/products/bajo-mesada-linea/white-grande-2.jpg',
        ],
      },
    ],
  },

  {
    id: 'p-002',
    slug: 'mesa-tv-nord',
    title: 'Mesa TV Nord',
    description: 'Mesa para TV con espacio de guardado. Diseño simple y moderno para living.',
    shortDescription: 'Mesa TV moderna con guardado.',
    category: ['Living', 'Cocina'],

    priceBase: 99900,

    tags: ['mesa tv', 'living', 'minimal'],
    installments: {
      enabled: true,
      count: 3,
      hasInterest: true,
      monthlyInterestRate: 0.04,
    },

    variants: [
      {
        id: 'v-002-1',
        sku: 'MTV-NORD-CHI-WHT',
        color: 'White',
        sizeCategory: 'Chico',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 5,
        price: 99900,
        images: [
          '/products/mesa-tv-nord/white-chico-1.jpg',
          '/products/mesa-tv-nord/white-chico-2.jpg',
        ],
      },
      {
        id: 'v-002-2',
        sku: 'MTV-NORD-MED-WHT',
        color: 'White',
        sizeCategory: 'Mediano',
        stock: 3,
        price: 114900,
        images: [
          '/products/mesa-tv-nord/white-mediano-1.jpg',
          '/products/mesa-tv-nord/white-mediano-2.jpg',
        ],
      },
      {
        id: 'v-002-3',
        sku: 'MTV-NORD-MED-BLK',
        color: 'Black',
        sizeCategory: 'Mediano',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 2,
        price: 119900,
        images: [
          '/products/mesa-tv-nord/black-mediano-1.jpg',
          '/products/mesa-tv-nord/black-mediano-2.jpg',
        ],
      },
      {
        id: 'v-002-4',
        sku: 'MTV-NORD-GRA-BLK',
        color: 'Black',
        sizeCategory: 'Grande',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 0,
        price: 139900,
        images: [
          '/products/mesa-tv-nord/black-grande-1.jpg',
          '/products/mesa-tv-nord/black-grande-2.jpg',
        ],
      },
    ],
  },

  {
    id: 'p-003',
    slug: 'escritorio-slim',
    title: 'Escritorio Slim',
    description:
      'Escritorio de melamina ideal para espacios chicos. Superficie amplia y estructura firme.',
    shortDescription: 'Escritorio compacto para oficina/estudio.',
    category: ['Oficina'],

    priceBase: 89900,
    discountPercentage: 5,

    featured: false,
    tags: ['escritorio', 'oficina', 'estudio'],

    installments: {
      enabled: true,
      count: 6,
      hasInterest: true,
      monthlyInterestRate: 0.03,
    },

    variants: [
      {
        id: 'v-003-1',
        sku: 'ESC-SLIM-CHI-WHT',
        color: 'White',
        sizeCategory: 'Chico',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 8,
        price: 89900,
        images: [
          '/products/escritorio-slim/white-chico-1.jpg',
          '/products/escritorio-slim/white-chico-2.jpg',
        ],
      },
      {
        id: 'v-003-2',
        sku: 'ESC-SLIM-MED-WHT',
        color: 'White',
        sizeCategory: 'Mediano',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 3,
        price: 104900,
        images: [
          '/products/escritorio-slim/white-mediano-1.jpg',
          '/products/escritorio-slim/white-mediano-2.jpg',
        ],
      },
      {
        id: 'v-003-3',
        sku: 'ESC-SLIM-GRA-BLK',
        color: 'Black',
        sizeCategory: 'Grande',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 1,
        price: 124900,
        images: [
          '/products/escritorio-slim/black-grande-1.jpg',
          '/products/escritorio-slim/black-grande-2.jpg',
        ],
      },
    ],
  },

  {
    id: 'p-004',
    slug: 'placard-compacto',
    title: 'Placard Compacto',
    description:
      'Placard de melamina con puertas y estantes internos. Solución práctica para dormitorio.',
    shortDescription: 'Placard compacto con estantes.',
    category: ['Dormitorio'],

    priceBase: 219900,

    featured: true,
    tags: ['placard', 'dormitorio', 'guardado'],

    installments: {
      enabled: true,
      count: 12,
      hasInterest: true,
      monthlyInterestRate: 0.045,
    },

    variants: [
      {
        id: 'v-004-1',
        sku: 'PLC-COMP-CHI-WHT',
        color: 'White',
        sizeCategory: 'Chico',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 4,
        price: 219900,
        images: [
          '/products/placard-compacto/white-chico-1.jpg',
          '/products/placard-compacto/white-chico-2.jpg',
        ],
      },
      {
        id: 'v-004-2',
        sku: 'PLC-COMP-MED-WHT',
        color: 'White',
        sizeCategory: 'Mediano',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 2,
        price: 249900,
        images: [
          '/products/placard-compacto/white-mediano-1.jpg',
          '/products/placard-compacto/white-mediano-2.jpg',
        ],
      },
      {
        id: 'v-004-3',
        sku: 'PLC-COMP-GRA-BLK',
        color: 'Black',
        sizeCategory: 'Grande',
        realSize: { ancho: 1, alto: 2, profundidad: 3 },
        stock: 1,
        price: 289900,
        images: [
          '/products/placard-compacto/black-grande-1.jpg',
          '/products/placard-compacto/black-grande-2.jpg',
        ],
      },
    ],
  },
];
