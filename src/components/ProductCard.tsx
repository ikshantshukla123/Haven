import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-blush-50">
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
        <div className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-rose-deep shadow">
          ₹{formatPrice(product.price)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 truncate font-semibold text-ink group-hover:text-rose-deep">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 min-h-10 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="flex justify-between">
          <span className="text-xs font-medium text-ink-soft">View Details</span>
          <span className="text-xs font-bold text-rose-deep">ORDER →</span>
        </div>
      </div>
    </Link>
  );
}