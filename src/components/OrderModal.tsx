"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/types";

type Props = {
  product: Product | null;
  isCustom?: boolean;
  onClose: () => void;
};

export default function OrderModal({ product, isCustom, onClose }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!product && !isCustom) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) return setError("Name is required");
    if (!/^[0-9]{10}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number");
    if (isCustom && !details.trim()) return setError("Gift details are required");

    setLoading(true);
    const supabase = createClient();
    const { error: dbError } = await supabase.from("orders").insert(
      isCustom
        ? { user_name: name, user_mobile: mobile, custom_details: details, is_custom: true }
        : {
            product_id: product!.id,
            product_name: product!.name,
            user_name: name,
            user_mobile: mobile,
            quantity,
          },
    );
    setLoading(false);

    if (dbError) {
      setError("Failed to place order. Please try again.");
      return;
    }
    setSuccess(
      isCustom
        ? "Your custom gift request has been sent! We will contact you within 24 hours."
        : "Order placed successfully! We will contact you soon.",
    );
    setTimeout(onClose, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-cream-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-cream-100 p-5">
          <h2 className="font-serif text-xl font-bold text-ink">
            {isCustom ? "Create Your Special Gift" : "Place Order"}
          </h2>
          <button onClick={onClose} className="text-2xl font-bold text-ink-soft hover:text-rose-deep" aria-label="Close">
            &times;
          </button>
        </div>

        {product && (
          <div className="flex items-center space-x-4 border-b border-blush-50 bg-blush-50/60 p-4">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-ink">{product.name}</p>
              <p className="font-bold text-rose-deep">₹{formatPrice(product.price * quantity)}</p>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-cream-200 px-4 py-3 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Mobile Number *</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              className="w-full rounded-xl border border-cream-200 px-4 py-3 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20"
            />
          </div>

          {isCustom && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Gift Details *</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                placeholder="Occasion, budget, preferred colors, specific items, special messages..."
                className="w-full resize-none rounded-xl border border-cream-200 px-4 py-3 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20"
              />
            </div>
          )}

          {product && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-ink">Quantity</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-lg border-2 border-cream-200 text-xl font-bold text-ink hover:bg-cream-50"
              >
                -
              </button>
              <span className="w-6 text-center text-lg font-bold text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-lg border-2 border-cream-200 text-xl font-bold text-ink hover:bg-cream-50"
              >
                +
              </button>
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}
          {success && (
            <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
          )}

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-cream-200 px-4 py-2 text-sm font-semibold text-ink-soft hover:bg-cream-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-2 text-sm font-bold text-white shadow hover:from-rose-deep-600 hover:to-rose-deep-700 disabled:opacity-50"
            >
              {loading ? "Placing..." : success ? "Done!" : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}