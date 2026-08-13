"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import OrderModal from "@/components/OrderModal";

export default function DetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-rose-deep hover:text-rose-deep-700"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-xl border border-cream-200 bg-white">
          <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 lg:gap-8 lg:p-6">
            <div className="flex items-center justify-center overflow-hidden rounded-lg border border-cream-100 bg-cream-50">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-[300px] w-full object-contain p-4 sm:h-[400px] lg:h-[500px]"
                />
              ) : (
                <div className="flex h-[300px] w-full items-center justify-center text-5xl text-blush-300">
                  🎁
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h1 className="font-serif text-3xl font-bold text-ink">{product.name}</h1>

              <div className="border-y border-cream-200 py-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-ink">₹{formatPrice(product.price)}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">Inclusive of all taxes</p>
              </div>

              <div>
                <h2 className="mb-2 text-lg font-semibold text-ink">Description</h2>
                <p className="leading-relaxed text-ink-soft">{product.description}</p>
              </div>

              <button
                onClick={() => setOrderOpen(true)}
                className="w-full max-w-xs rounded-lg bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-3 text-base font-bold text-white transition hover:from-rose-deep-600 hover:to-rose-deep-700"
              >
                BUY NOW
              </button>

              <div className="grid grid-cols-2 gap-3 text-sm text-ink-soft">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure Online Ordering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy Customization</span>
                </div>
              </div>

              <div className="rounded-xl border border-blush-100 bg-blush-50 p-4">
                <p className="font-semibold text-ink">Delivery Information:</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Order 5 days in advance for guaranteed delivery. Contact us for customization
                  options after ordering.
                </p>
              </div>

              <div className="rounded-xl bg-cream-100 p-4">
                <h3 className="mb-3 font-semibold text-ink">Why Choose This Product?</h3>
                <ul className="space-y-2 text-sm text-ink-soft">
                  {[
                    "Premium Quality Materials",
                    "Customization Available",
                    "Secure Online Ordering",
                    "5-Day Advance Order",
                    "Trusted by 100+ Customers",
                  ].map((f) => (
                    <li key={f} className="flex items-center">
                      <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-rose-deep" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-8 text-center font-serif text-2xl font-bold text-ink">
              Customers Also Bought
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.id}`}
                  className="group rounded-xl border-2 border-cream-100 bg-white transition hover:border-blush-300"
                >
                  <div className="aspect-square overflow-hidden rounded-t-xl bg-cream-50">
                    {rp.image_url ? (
                      <img
                        src={rp.image_url}
                        alt={rp.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-blush-300">🎁</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 h-10 text-sm font-semibold text-ink">
                      {rp.name}
                    </h3>
                    <span className="text-lg font-bold text-ink">₹{formatPrice(rp.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {orderOpen && <OrderModal product={product} onClose={() => setOrderOpen(false)} />}
    </main>
  );
}