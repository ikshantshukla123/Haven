export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  listing_price: number | null;
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
  address?: string | null;
  city?: string | null;
  pincode?: string | null;
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

// Listing (MRP) price worth showing cut in the UI: only when set and higher
// than the selling price. Handles null/undefined/string values from the DB.
export function listingPrice(p: Product): number | null {
  const raw: unknown = p.listing_price;
  if (raw === null || raw === undefined || raw === "") return null;
  const mrp = Number(raw);
  if (!Number.isFinite(mrp) || mrp <= Number(p.price)) return null;
  return mrp;
}

export function discountPct(p: Product): number | null {
  const mrp = listingPrice(p);
  if (mrp === null) return null;
  return Math.round(((mrp - Number(p.price)) / mrp) * 100);
}