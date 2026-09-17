"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactMessage, Order, Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import Spinner from "@/components/Spinner";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "Hamper-haven";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

type Tab = "view" | "create" | "orders" | "messages";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  count_in_stock: "10",
  image: null as File | null,
};

type OrderFilter = "all" | "product" | "custom";

// Split the stored custom_details into a readable item part + delivery address part.
// Product orders store: "Address: <addr> | Note: ... | Cart order: ..."
// Custom orders store:  "Gift: <gift> | Address: <addr> | Note: ..."
function splitOrderDetails(o: Order): { item: string; address: string } {
  const cd = o.custom_details ?? "";
  const columnAddress = [o.address, o.city, o.pincode].filter(Boolean).join(", ");
  if (o.is_custom) {
    const marker = " | Address: ";
    const idx = cd.indexOf(marker);
    if (idx >= 0) {
      return {
        item: cd.slice(0, idx).replace(/^Gift:\s*/, ""),
        address: columnAddress || cd.slice(idx + marker.length),
      };
    }
    return { item: cd.replace(/^Gift:\s*/, ""), address: columnAddress };
  }
  let address = cd.startsWith("Address: ") ? cd.slice("Address: ".length) : cd;
  if (columnAddress) address = columnAddress + (address ? ` (${address})` : "");
  return { item: o.product_name ?? "", address };
}

export default function AdminPanelClient({ userEmail }: { userEmail: string }) {
  const [tab, setTab] = useState<Tab>("view");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<Product | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("all");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const notify = (fn: () => void) => {
    setError("");
    setSuccess("");
    fn();
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchProducts(), fetchOrders(), fetchMessages()]);
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setError(`File too large (max 2MB). Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (!["image/webp", "image/png"].includes(file.type)) {
      setError("Only WebP or PNG images are allowed.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setForm({ ...form, image: file });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.price || !form.count_in_stock) {
      return setError("All fields are required");
    }

    setSaving(true);
    notify(() => {});

    let imageUrl: string | null = null;

    if (form.image) {
      const path = `products/${crypto.randomUUID()}-${form.image.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, form.image, {
        contentType: form.image.type,
        upsert: false,
      });
      if (uploadError) {
        setSaving(false);
        return setError(`Image upload failed: ${uploadError.message}`);
      }
      imageUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      count_in_stock: parseInt(form.count_in_stock, 10),
      ...(imageUrl ? { image_url: imageUrl } : {}),
    };

    let dbError: { message: string } | null = null;
    if (editing) {
      ({ error: dbError } = await supabase.from("products").update(payload).eq("id", editing.id));
    } else {
      ({ error: dbError } = await supabase.from("products").insert(payload));
    }

    setSaving(false);
    if (dbError) return setError(dbError.message);

    setSuccess(editing ? "Product updated successfully!" : "Product created successfully!");
    resetForm();
    fetchProducts();
    setTab("view");
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      count_in_stock: String(p.count_in_stock ?? 10),
      image: null,
    });
    setTab("create");
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    if (error) return setError("Failed to delete product");
    setSuccess("Product deleted");
    fetchProducts();
  };

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;
    setDeletingId(id);
    const { error } = await supabase.from("orders").delete().eq("id", id);
    setDeletingId(null);
    if (error) return setError("Failed to delete order");
    setSuccess("Order deleted");
    fetchOrders();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    setDeletingId(id);
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    setDeletingId(null);
    if (error) return setError("Failed to delete message");
    setSuccess("Message deleted");
    fetchMessages();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "view", label: "📦 Products" },
    { id: "create", label: editing ? "✏️ Edit Product" : "➕ Add Product" },
    { id: "orders", label: "📋 Orders" },
    { id: "messages", label: "✉️ Messages" },
  ];

  const inputClass =
    "w-full rounded-xl border border-cream-200 px-4 py-3 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20";

  const visibleOrders = orders.filter((o) =>
    orderFilter === "all" ? true : orderFilter === "custom" ? o.is_custom : !o.is_custom,
  );

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-black text-ink">
            Admin Panel
          </h1>
          <p className="mt-1 text-ink-soft">Signed in as {userEmail}</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                if (t.id !== "create") resetForm();
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                tab === t.id
                  ? "bg-rose-deep text-white"
                  : "border border-cream-200 bg-white text-ink-soft hover:bg-blush-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blush-200 border-t-rose-deep" />
          </div>
        ) : (
          <>
            {tab === "view" && (
              <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-ink">All Products</h2>
                  <span className="rounded-full bg-blush-100 px-3 py-1 text-sm font-semibold text-rose-deep">
                    {products.length} products
                  </span>
                </div>
                {products.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="mb-4 text-ink-soft">No products yet. Add your first product!</p>
                    <button
                      onClick={() => setTab("create")}
                      className="rounded-full bg-rose-deep px-6 py-2 font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-rose-deep-600 hover:shadow-md active:translate-y-0 active:scale-95"
                    >
                      Add First Product
                    </button>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-cream-100">
                    <thead className="bg-cream-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Stock</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-ink-soft">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-cream-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-cream-200 bg-cream-50">
                                {p.image_url ? (
                                  <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-2xl text-blush-300">🎁</div>
                                )}
                              </div>
                              <div className="ml-4">
                                <p className="font-semibold text-ink">{p.name}</p>
                                <p className="line-clamp-1 max-w-md text-sm text-ink-soft">{p.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-bold text-rose-deep">₹{formatPrice(p.price)}</td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-ink-soft">
                              {p.count_in_stock ?? 0} in stock
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleEdit(p)}
                              className="mr-2 rounded-lg bg-rose-deep px-3 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-rose-deep-600 hover:shadow-sm active:scale-90"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              disabled={deletingId === p.id}
                              className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-red-600 hover:shadow-sm active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                            >
                              {deletingId === p.id ? "..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {tab === "create" && (
              <div className="rounded-2xl border border-cream-200 bg-white p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-ink">
                    {editing ? "Edit Product" : "Add New Product"}
                  </h2>
                  {editing && (
                    <button onClick={resetForm} className="font-semibold text-rose-deep hover:text-rose-deep-700">
                      ✕ Cancel Edit
                    </button>
                  )}
                </div>

                {editing && (
                  <div className="mb-6 rounded-xl border border-blush-100 bg-blush-50 p-4 text-sm font-medium text-rose-deep">
                    Editing: <span className="font-bold">{editing.name}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-ink">Product Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter product name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-ink">Price (₹) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="0.00"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">Description *</label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe your product..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-ink">Stock Quantity *</label>
                      <input
                        type="number"
                        min="0"
                        value={form.count_in_stock}
                        onChange={(e) => setForm({ ...form, count_in_stock: e.target.value })}
                        placeholder="10"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-ink">
                        Product Image {!editing && "*"}
                      </label>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/webp,image/png"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border border-cream-200 px-4 py-3 file:mr-4 file:rounded-full file:border-0 file:bg-blush-100 file:px-4 file:py-2 file:font-semibold file:text-rose-deep"
                      />
                      {form.image && (
                        <p className="mt-2 text-sm text-green-600">
                          Selected: {form.image.name} ({(form.image.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                      {editing && (
                        <p className="mt-2 text-sm text-ink-soft">Leave empty to keep the current image</p>
                      )}
                      <p className="mt-1 text-xs text-ink-soft">Max 2MB • WebP or PNG only</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-8 py-2.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:active:scale-100"
                  >
                    {saving && <Spinner />}
                    {saving ? "Saving..." : editing ? "Update Product" : "Add Product"}
                  </button>
                </form>
              </div>
            )}

            {tab === "orders" && (
              <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-ink">
                    All Orders{" "}
                    <span className="ml-1 rounded-full bg-blush-100 px-3 py-1 text-sm font-semibold text-rose-deep">
                      {orders.length}
                    </span>
                  </h2>
                  <div className="flex gap-2">
                    {(
                      [
                        { id: "all", label: "All" },
                        { id: "product", label: "Products" },
                        { id: "custom", label: "Custom" },
                      ] as { id: OrderFilter; label: string }[]
                    ).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setOrderFilter(f.id)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                          orderFilter === f.id
                            ? "bg-rose-deep text-white"
                            : "border border-cream-200 bg-white text-ink-soft hover:bg-blush-50"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                {orders.length === 0 ? (
                  <p className="py-12 text-center text-ink-soft">No orders found yet.</p>
                ) : visibleOrders.length === 0 ? (
                  <p className="py-12 text-center text-ink-soft">
                    No {orderFilter === "custom" ? "custom" : "product"} orders found.
                  </p>
                ) : (
                  <table className="min-w-full divide-y divide-cream-100">
                    <thead className="bg-cream-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Delivery Address</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Date</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-ink-soft">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {visibleOrders.map((o) => {
                        const { item, address } = splitOrderDetails(o);
                        return (
                            <tr key={o.id} className="align-top hover:bg-cream-50">
                              <td className="whitespace-nowrap px-4 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${o.is_custom ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
                                  {o.is_custom ? "Custom" : `Product${o.quantity > 1 ? ` ×${o.quantity}` : ""}`}
                                </span>
                              </td>
                              <td className="min-w-40 max-w-xs px-4 py-4">
                                <p className="break-words text-sm font-medium text-ink">{item || "—"}</p>
                              </td>
                              <td className="min-w-48 max-w-sm px-4 py-4">
                                <p className="break-words text-sm text-ink-soft">{address || "—"}</p>
                              </td>
                              <td className="whitespace-nowrap px-4 py-4">
                                <p className="text-sm font-semibold text-ink">{o.user_name}</p>
                                <p className="font-mono text-xs text-ink-soft">{o.user_mobile}</p>
                              </td>
                              <td className="whitespace-nowrap px-4 py-4 text-xs text-ink-soft">
                                {new Date(o.created_at).toLocaleString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td className="px-4 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteOrder(o.id)}
                                  disabled={deletingId === o.id}
                                  className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 transition-all duration-150 hover:bg-red-200 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                                >
                                  {deletingId === o.id ? "..." : "Delete"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {tab === "messages" && (
              <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-ink">Contact Messages</h2>
                {messages.length === 0 ? (
                  <p className="py-12 text-center text-ink-soft">No messages yet.</p>
                ) : (
                  <table className="min-w-full divide-y divide-cream-100">
                    <thead className="bg-cream-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Contact</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Date</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-ink-soft">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {messages.map((m) => (
                        <tr key={m.id} className="hover:bg-cream-50">
                          <td className="px-4 py-4 font-semibold text-ink">{m.name}</td>
                          <td className="px-4 py-4 text-sm text-ink-soft">
                            <p>{m.email}</p>
                            {m.phone && <p className="font-mono">{m.phone}</p>}
                          </td>
                          <td className="px-4 py-4 text-sm text-ink">{m.subject}</td>
                          <td className="max-w-xs px-4 py-4">
                            <p className="line-clamp-3 text-sm text-ink-soft">{m.message}</p>
                          </td>
                          <td className="px-4 py-4 text-sm text-ink-soft">
                            {new Date(m.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              disabled={deletingId === m.id}
                              className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 transition-all duration-150 hover:bg-red-200 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                            >
                              {deletingId === m.id ? "..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}