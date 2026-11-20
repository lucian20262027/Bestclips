export type CityId = 'cali' | 'miami' | 'nyc' | 'tokyo';

export type FinishCategory =
  | 'Mirror Gloss'
  | 'Velvet Matte'
  | 'Brushed Metal'
  | 'Silk & Pearl';

export type HairDensityTag =
  | 'Fine & Silky'
  | 'Medium'
  | 'Thick & Curly'
  | 'Half-Up & Bangs';

export type SilhouetteType = 'Full Claw' | 'Arch Jaw' | 'Barrette & Pin' | 'Mini Set';

export interface ProductItem {
  id: string;
  cityId: CityId;
  name: string;
  shade: string;
  swatch: string;
  price: number;
  material: string;
  dimensions: string;
  lengthCm: number;
  weightGrams: number;
  holdScore: number; // 1-10 tension rating
  hairType: string;
  hairDensityTags: HairDensityTag[];
  finishCategory: FinishCategory;
  silhouette: SilhouetteType;
  badge?: string;
  rating: number;
  reviewCount: number;
  desc: string;
  craftNote: string;
  stylingTip: string;
  image: string;
  editorialImage: string;
  pairWithIds: string[];
}

export interface CityCollection {
  id: CityId;
  anchor: string;
  code: string;
  title: string;
  subtitle: string;
  tagline: string;
  coordinates: string;
  climateNote: string;
  moodColor: string;
  editorialImage: string;
  editorialCaption: string;
  stylingEthos: string;
  items: ProductItem[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface PromoCode {
  code: string;
  pct: number;
  desc: string;
}

export interface HairReview {
  id: string;
  author: string;
  location: string;
  hairProfile: string;
  densityTag: HairDensityTag;
  productId: string;
  productName: string;
  cityTitle: string;
  rating: number;
  title: string;
  quote: string;
  verifiedDate: string;
}
