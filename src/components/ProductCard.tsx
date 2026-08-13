import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-lg border border-cream-200 bg-white transition-colors hover:border-rose-deep"
    >
      <div className="relative h-44 overflow-hidden bg-blush-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-blush-300">
            <span className="text-3xl">🎁</span>
            <span className="mt-2 text-xs font-medium">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="truncate text-sm font-semibold text-ink group-hover:text-rose-deep">
          {product.name}
        </h3>
        <p className="line-clamp-2 min-h-8 text-xs leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-bold text-ink">₹{formatPrice(product.price)}</span>
          <span className="text-xs font-semibold text-rose-deep">Order Now →</span>
        </div>
      </div>
    </Link>
  );
}