"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/types";
import Spinner from "@/components/Spinner";

type View = "cart" | "checkout" | "success";

type OrderSummary = {
  name: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
  itemCount: number;
  total: number;
};

const inputClass =
  "w-full rounded-xl border border-cream-200 px-4 py-3 text-sm focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20";

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, remove, setQty, clear } = useCart();
  const [view, setView] = useState<View>("cart");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [note, setNote] = useState("");
  const [placing, setPlacing] = useState(false);
  const [formError, setFormError] = useState("");
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  if (!isOpen) return null;

  const close = () => {
    closeCart();
    // reset to cart view after close animation time
    setTimeout(() => {
      setView("cart");
      setFormError("");
    }, 200);
  };

  const startCheckout = () => {
    setFormError("");
    setView("checkout");
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) return setFormError("Please enter your full name.");
    if (!/^[0-9]{10}$/.test(mobile)) return setFormError("Enter a valid 10-digit mobile number.");
    if (address.trim().length < 10) return setFormError("Please enter your complete delivery address.");
    if (!city.trim()) return setFormError("Please enter your city.");
    if (!/^[0-9]{6}$/.test(pincode)) return setFormError("Enter a valid 6-digit pincode.");
    if (items.length === 0) return setFormError("Your cart is empty.");

    setPlacing(true);
    const supabase = createClient();
    const delivery = `${address.trim()}, ${city.trim()} - ${pincode}`;

    const rows = items.map((it) => ({
      product_id: it.product.id,
      product_name: `${it.product.name} × ${it.qty}`,
      user_name: name.trim(),
      user_mobile: mobile,
      quantity: it.qty,
      custom_details: `Address: ${delivery}${note.trim() ? ` | Note: ${note.trim()}` : ""} | Cart order: ${items.length} item(s), Total ₹${formatPrice(subtotal)}`,
    }));

    const { error } = await supabase.from("orders").insert(rows);
    setPlacing(false);

    if (error) {
      setFormError("Failed to place order. Please try again.");
      return;
    }

    setSummary({
      name: name.trim(),
      mobile,
      address: address.trim(),
      city: city.trim(),
      pincode,
      itemCount: count,
      total: subtotal,
    });
    clear();
    setView("success");
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 bg-white px-5 py-4">
          <h2 className="font-serif text-xl font-bold text-ink">
            {view === "success"
              ? "Order Confirmed"
              : view === "checkout"
                ? "Delivery Details"
                : `Your Cart${count > 0 ? ` (${count})` : ""}`}
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="rounded-full p-2 text-xl font-bold leading-none text-ink-soft hover:bg-cream-100 hover:text-rose-deep"
          >
            &times;
          </button>
        </div>

        {/* CART VIEW */}
        {view === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-5xl">🎁</p>
                  <h3 className="mt-4 text-lg font-bold text-ink">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Beautiful hampers are waiting for you.
                  </p>
                  <button
                    onClick={close}
                    className="mt-5 rounded-full bg-rose-deep px-6 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-deep-600 hover:shadow-lg active:translate-y-0 active:scale-95"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 rounded-xl border border-cream-200 bg-white p-3"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-blush-50">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-2xl text-blush-300">
                            🎁
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                        <p className="mt-0.5 text-sm font-bold text-rose-deep">
                          ₹{formatPrice(Number(product.price) * qty)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(product.id, qty - 1)}
                              aria-label="Decrease quantity"
                              className="h-8 w-8 rounded-lg border border-cream-200 text-lg font-bold text-ink transition-all duration-150 hover:border-rose-deep hover:text-rose-deep active:scale-90"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{qty}</span>
                            <button
                              onClick={() => setQty(product.id, qty + 1)}
                              aria-label="Increase quantity"
                              className="h-8 w-8 rounded-lg border border-cream-200 text-lg font-bold text-ink transition-all duration-150 hover:border-rose-deep hover:text-rose-deep active:scale-90"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(product.id)}
                            className="text-xs font-semibold text-red-600 transition-colors hover:text-red-800 hover:underline active:scale-95"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-cream-200 bg-white px-5 py-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-soft">Subtotal</span>
                  <span className="text-lg font-bold text-ink">₹{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-3 text-xs text-ink-soft">
                  Order 5 days in advance for guaranteed delivery.
                </p>
                <button
                  onClick={startCheckout}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-[0.99]"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clear}
                  className="mt-2 w-full rounded-xl border border-cream-200 px-4 py-2 text-xs font-semibold text-ink-soft transition-all duration-200 hover:bg-cream-50 active:scale-[0.99]"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </>
        )}

        {/* CHECKOUT VIEW */}
        {view === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 rounded-xl border border-blush-100 bg-blush-50/60 px-4 py-3 text-sm">
                <span className="font-semibold text-ink">
                  {count} item{count > 1 ? "s" : ""}
                </span>
                <span className="text-ink-soft"> · Total </span>
                <span className="font-bold text-rose-deep">₹{formatPrice(subtotal)}</span>
              </div>

              <form onSubmit={placeOrder} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">Full Name *</label>
                  <input
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Pincode *</label>
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="6-digit pincode"
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Note (optional)
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Gift message, customization..."
                    className={inputClass}
                  />
                </div>

                {formError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={placing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:active:scale-100"
                >
                  {placing && <Spinner />}
                  {placing ? "Placing Order..." : `Place Order · ₹${formatPrice(subtotal)}`}
                </button>
              </form>

              <button
                onClick={() => setView("cart")}
                className="mt-3 w-full rounded-xl border border-cream-200 bg-white px-4 py-2 text-xs font-semibold text-ink-soft transition-all duration-200 hover:bg-cream-50 active:scale-[0.99]"
              >
                ← Back to Cart
              </button>
            </div>
          </>
        )}

        {/* SUCCESS / THANK YOU CARD */}
        {view === "success" && summary && (
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white text-center shadow-sm">
              <div className="bg-gradient-to-r from-rose-deep to-rose-deep-600 px-6 py-8 text-white">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-green-600">
                    ✓
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-black">Thank You, {summary.name}!</h3>
                <p className="mt-1 text-sm text-blush-100">
                  Your order has been placed successfully 🎉
                </p>
              </div>
              <div className="space-y-3 px-6 py-6 text-left text-sm">
                <div className="flex justify-between rounded-xl bg-cream-50 px-4 py-3">
                  <span className="font-medium text-ink-soft">Items</span>
                  <span className="font-bold text-ink">{summary.itemCount}</span>
                </div>
                <div className="flex justify-between rounded-xl bg-cream-50 px-4 py-3">
                  <span className="font-medium text-ink-soft">Total</span>
                  <span className="font-bold text-rose-deep">₹{formatPrice(summary.total)}</span>
                </div>
                <div className="rounded-xl bg-cream-50 px-4 py-3">
                  <p className="font-semibold text-ink">Delivering to</p>
                  <p className="mt-1 text-ink-soft">
                    {summary.address}, {summary.city} - {summary.pincode}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-soft">{summary.mobile}</p>
                </div>
                <p className="pt-1 text-center text-xs text-ink-soft">
                  We will contact you soon to confirm delivery. Order 5 days in advance for
                  guaranteed delivery.
                </p>
              </div>
            </div>
            <button
              onClick={close}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-[0.99]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
