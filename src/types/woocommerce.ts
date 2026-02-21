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
  images: WooImage[];
  categories: WooCategory[];
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
  meta_data?: { key: string; value: string }[];
}
