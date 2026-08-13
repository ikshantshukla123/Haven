"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import OrderModal from "@/components/OrderModal";

const ITEMS_PER_BATCH = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          setError("Failed to fetch products");
        } else {
          setProducts(data ?? []);
        }
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [products, search, sortBy]);

  const resetPagination = () => setVisibleCount(ITEMS_PER_BATCH);

  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="bg-gradient-to-r from-rose-deep to-rose-deep-700 py-10 text-center text-white">
        <h1 className="font-serif text-3xl font-black sm:text-4xl">Our Collection</h1>
        <p className="mx-auto mt-2 max-w-2xl px-4 text-blush-100">
          Beautiful hampers for every special occasion
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPagination(); }}
              className="w-full rounded-lg border border-cream-200 py-2 pl-9 pr-3 text-sm focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); resetPagination(); }}
            className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm text-ink focus:border-rose-deep focus:outline-none sm:w-44"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blush-200 border-t-rose-deep" />
            <p className="mt-4 font-semibold text-rose-deep">Loading our beautiful collection...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-cream-200 bg-white p-8 py-16 text-center shadow-md">
            <p className="mb-3 text-4xl">🎁</p>
            <h2 className="mb-2 text-lg font-bold text-ink">
              {search ? "No products found" : "No Products Available"}
            </h2>
            <p className="mb-4 text-sm text-ink-soft">
              {search
                ? `No products match "${search}". Try a different search term.`
                : "We are updating our inventory. Please check back soon!"}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-full bg-rose-deep px-4 py-2 text-sm font-semibold text-white hover:bg-rose-deep-600"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink-soft">
              Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {visible.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => setOrderProduct(product)}
                    className="absolute right-3 top-3 rounded-full bg-rose-deep px-3 py-1 text-[10px] font-bold text-white opacity-0 shadow transition group-hover:opacity-100"
                  >
                    ORDER
                  </button>
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((v) => v + ITEMS_PER_BATCH)}
                  className="rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:from-rose-deep-600 hover:to-rose-deep-700"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {orderProduct && (
        <OrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
      )}
    </main>
  );
}