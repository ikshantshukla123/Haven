"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/types";
import Spinner from "@/components/Spinner";

type Props = {
  product: Product | null;
  isCustom?: boolean;
  initialQuantity?: number;
  onClose: () => void;
};

type PlacedOrder = {
  title: string;
  total: number;
  name: string;
  mobile: string;
  addressLine: string;
  isCustom: boolean;
};

const inputClass =
  "w-full rounded-xl border border-cream-200 px-4 py-3 text-sm focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20";

export default function OrderModal({ product, isCustom, initialQuantity = 1, onClose }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [details, setDetails] = useState("");
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [error, setError] = useState("");

  if (!product && !isCustom) return null;

  const total = product ? Number(product.price) * quantity : 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your full name.");
    if (!/^[0-9]{10}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number.");
    if (address.trim().length < 10) return setError("Please enter your complete delivery address.");
    if (!city.trim()) return setError("Please enter your city.");
    if (!/^[0-9]{6}$/.test(pincode)) return setError("Enter a valid 6-digit pincode.");
    if (isCustom && !details.trim()) return setError("Please describe your gift requirement.");

    setLoading(true);
    const supabase = createClient();
    const delivery = `${address.trim()}, ${city.trim()} - ${pincode}`;

    const { error: dbError } = await supabase.from("orders").insert(
      isCustom
        ? {
            user_name: name.trim(),
            user_mobile: mobile,
            custom_details: `Gift: ${details.trim()} | Address: ${delivery}${note.trim() ? ` | Note: ${note.trim()}` : ""}`,
            is_custom: true,
          }
        : {
            product_id: product!.id,
            product_name: `${product!.name} × ${quantity}`,
            user_name: name.trim(),
            user_mobile: mobile,
            quantity,
            is_custom: false,
            custom_details: `Address: ${delivery}${note.trim() ? ` | Note: ${note.trim()}` : ""} | Total ₹${formatPrice(total)}`,
          },
    );
    setLoading(false);

    if (dbError) {
      setError("Failed to place order. Please try again.");
      return;
    }

    setPlaced({
      title: isCustom ? "Custom gift request" : `${product!.name} × ${quantity}`,
      total,
      name: name.trim(),
      mobile,
      addressLine: delivery,
      isCustom: !!isCustom,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-cream-200 bg-white">
        {placed ? (
          /* THANK YOU CARD */
          <div className="overflow-hidden rounded-xl text-center">
            <div className="bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-8 text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-green-600">
                  ✓
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-black">Thank You, {placed.name}!</h2>
              <p className="mt-1 text-sm text-blush-100">
                {placed.isCustom
                  ? "Your custom gift request has been sent 🎉"
                  : "Your order has been placed successfully 🎉"}
              </p>
            </div>
            <div className="space-y-3 px-6 py-6 text-left text-sm">
              <div className="rounded-xl bg-cream-50 px-4 py-3">
                <p className="font-semibold text-ink">{placed.title}</p>
                {!placed.isCustom && (
                  <p className="mt-1 font-bold text-rose-deep">₹{formatPrice(placed.total)}</p>
                )}
              </div>
              <div className="rounded-xl bg-cream-50 px-4 py-3">
                <p className="font-semibold text-ink">Delivering to</p>
                <p className="mt-1 text-ink-soft">{placed.addressLine}</p>
                <p className="mt-1 font-mono text-xs text-ink-soft">{placed.mobile}</p>
              </div>
              <p className="pt-1 text-center text-xs text-ink-soft">
                {placed.isCustom
                  ? "We will contact you within 24 hours to discuss your gift."
                  : "We will contact you soon to confirm delivery."}
              </p>
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full rounded-lg bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-2.5 text-sm font-bold text-white shadow transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-[0.99]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-cream-100 p-5">
              <h2 className="font-serif text-xl font-bold text-ink">
                {isCustom ? "Create Your Special Gift" : "Delivery Details"}
              </h2>
              <button
                onClick={onClose}
                className="text-2xl font-bold text-ink-soft hover:text-rose-deep"
                aria-label="Close"
              >
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
                  <p className="font-bold text-rose-deep">₹{formatPrice(total)}</p>
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
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  Delivery Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="House no, street, area, landmark..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6-digit pincode"
                    inputMode="numeric"
                    className={inputClass}
                  />
                </div>
              </div>

              {isCustom && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Gift Details *
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    placeholder="Occasion, budget, preferred colors, specific items, special messages..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              )}

              {!isCustom && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Note (optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Gift message, customization..."
                    className={inputClass}
                  />
                </div>
              )}

              {product && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-ink">Quantity</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-lg border-2 border-cream-200 text-xl font-bold text-ink transition-all duration-150 hover:border-rose-deep hover:text-rose-deep active:scale-90"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-lg font-bold text-ink">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="h-10 w-10 rounded-lg border-2 border-cream-200 text-xl font-bold text-ink transition-all duration-150 hover:border-rose-deep hover:text-rose-deep active:scale-90"
                  >
                    +
                  </button>
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border-2 border-cream-200 px-4 py-2 text-sm font-semibold text-ink-soft transition-all duration-200 hover:bg-cream-50 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-2 text-sm font-bold text-white shadow transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
                >
                  {loading && <Spinner />}
                  {loading ? "Placing..." : "Place Order"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
