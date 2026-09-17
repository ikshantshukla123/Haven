"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-cream-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-rose-deep hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
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
              <span className="text-2xl">🎁</span>
              <span className="mt-1.5 text-[11px] font-medium">No Image</span>
            </div>
          )}
          {product.description && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="line-clamp-4 text-center text-[11px] leading-relaxed text-white">
                {product.description}
              </p>
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="truncate text-[13px] font-semibold text-ink group-hover:text-rose-deep">
            {product.name}
          </h3>
          <div className="mt-0.5 flex items-center justify-between">
            <span className="text-[13px] font-bold text-ink">
              ₹{formatPrice(Number(product.price))}
            </span>
            <span className="text-[11px] font-semibold text-rose-deep">
              <span className="underline-offset-2 decoration-rose-deep decoration-1 group-hover:underline">
                Order Now
              </span>{" "}
              →
            </span>
          </div>
        </div>
      </Link>
      <div className="px-2 pb-2">
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={`w-full rounded-md px-2 py-1.5 text-[11px] font-bold transition-all duration-200 active:scale-95 ${
            added
              ? "bg-green-600 text-white shadow-md shadow-green-600/25"
              : "border border-rose-deep/20 bg-blush-50 text-rose-deep hover:bg-rose-deep hover:text-white hover:shadow-md"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
