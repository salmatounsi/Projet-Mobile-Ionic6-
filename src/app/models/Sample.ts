export interface ServiceSample {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  price_basic: number;
  price_standard: number;
  price_premium: number;
  delivery_time: number;
  revisions: number;
  features: string[];
  image: string;
  rating: number;
  reviews_count: number;
  created_at: string | Date;
}

export interface ProductSample {
  _id: string;
  seller_id: string;
  seller_name: string;
  seller_role: string;
  title: string;
  description: string;
  version: string;
  license: string;
  price: number;
  main_image: string;
  gallery: string[];
  created_at: string | Date;
}

export interface JobSample {
  _id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  budget_type: 'fixed' | 'hourly';
  experience_level?: string;
  location?: string;
  skills?: string[];
  created_at: string | Date;
}
