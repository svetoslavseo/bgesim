
interface ImportMetaEnv {
    readonly VITE_IMAGES_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

export interface Region {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface Author {
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  countryCode?: string;
  flag: string;
  flagUrl: string;
  plans: Plan[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Plan {
  id: string;
  name: string;
  data_amount: number;
  data_unit: string;
  validity_days: number;
  price: {
    amount_with_tax: number;
    currency: string;
  };
  covered_countries: string[];
  identifier?: string;
  data?: string;
  validity?: string;
  currency?: string;
  planType?: 'country' | 'regional' | 'global';
  region?: string;
}

export interface PlansData {
  items: Plan[];
}
export interface ImageType {
    [key: string]: string;
}
