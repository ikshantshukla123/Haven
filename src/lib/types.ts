export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  count_in_stock: number;
  created_at: string;
};

export type Order = {
  id: string;
  product_id: string | null;
  product_name: string | null;
  user_name: string;
  user_mobile: string;
  custom_details: string | null;
  is_custom: boolean;
  quantity: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN").format(price);
}