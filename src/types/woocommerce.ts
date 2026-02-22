export interface WooMetaData {
  id: number;
  key: string;
  value: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  images: WooImage[];
  categories: WooCategory[];
  meta_data: WooMetaData[];
  average_rating: string;
  rating_count: number;
  weight: string;
}

export interface WooImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooLineItem {
  product_id: number;
  quantity: number;
  name?: string;
  price?: number;
  total?: string;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  currency: string;
  billing: WooAddress;
  shipping: WooAddress;
  line_items: WooLineItem[];
  date_created: string;
  payment_method: string;
  payment_method_title: string;
  set_paid?: boolean;
  transaction_id?: string;
  meta_data?: WooMetaData[];
  order_key?: string;
}

export interface WooReview {
  id: number;
  date_created: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
  reviewer_avatar_urls: Record<string, string>;
  meta_data?: WooMetaData[];
}
