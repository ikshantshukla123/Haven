"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, HERO_IMAGES, galleryUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setProducts(data);
          setFeatured(data.slice(0, 8));
        }
      });
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-cream-50">
      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={galleryUrl(HERO_IMAGES[current])}
              alt="Hero"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center text-white">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-block rounded-full border border-white/30 bg-white/20 px-6 py-2 text-sm font-semibold"
          >
            🎀 Premium Gift Hampers
          </motion.span>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif text-5xl font-black leading-tight md:text-7xl"
          >
            Hamper Heaven
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mb-8 mt-4 max-w-3xl text-xl font-light leading-relaxed text-blush-100"
          >
            Where every gift tells a story of elegance, love, and unforgettable moments
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/products"
              className="rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-8 py-3 text-lg font-bold text-white transition hover:from-rose-deep-600 hover:to-rose-deep-700"
            >
              🎁 Explore Collection
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/30 bg-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/30"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 h-3 w-1 rounded-full bg-white/70"
            />
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 font-semibold text-rose-deep">Our Masterpieces</p>
            <h2 className="font-serif text-3xl font-black text-ink sm:text-5xl">
              Visual Elegance
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-ink-soft">
              Discover our carefully crafted hampers, each designed to create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GALLERY.map((photo, i) => (
              <motion.div
                key={photo}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-cream-200 bg-white"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={galleryUrl(photo)}
                    alt={`Luxury hamper ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div>
                      <p className="text-lg font-bold">Luxury Collection</p>
                      <p className="text-sm text-blush-200">Handcrafted with love</p>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-deep text-lg font-bold">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-8 py-3 font-semibold text-white transition hover:from-rose-deep-600 hover:to-rose-deep-700"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-blush-50 via-cream-50 to-champagne-100 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-16 text-center font-serif text-4xl font-black text-ink sm:text-6xl">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: "🎁",
                title: "Premium Quality",
                desc: "Hand-curated with the finest products, ensuring excellence in every detail",
                features: ["Premium Materials", "Handcrafted", "Quality Assured"],
              },
              {
                icon: "💝",
                title: "Elegant Packaging",
                desc: "Stunning presentation that turns every gift into an unforgettable experience",
                features: ["Luxury Wrapping", "Custom Designs", "Eco-friendly"],
              },
              {
                icon: "🚚",
                title: "Seamless Delivery",
                desc: "Reliable delivery with care and attention to every package",
                features: ["On-time Delivery", "Safe Packaging", "Tracking Available"],
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-2xl border border-cream-200 bg-white p-8"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-200 to-rose-deep text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-center text-2xl font-bold text-ink">{item.title}</h3>
                <p className="mb-6 text-center leading-relaxed text-ink-soft">{item.desc}</p>
                <ul className="space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center text-sm text-ink-soft">
                      <span className="mr-3 h-2 w-2 rounded-full bg-rose-deep" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-black text-ink sm:text-5xl">
              Bestsellers
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group overflow-hidden rounded-lg border border-cream-200 bg-white transition-colors hover:border-rose-deep"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-blush-50">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-blush-300">🎁</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                    <p className="font-bold text-rose-deep">₹{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-deep via-rose-deep-700 to-rose-deep-800" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <p className="mb-4 text-lg font-semibold text-blush-200">Ready to Create Magic?</p>
          <h2 className="mb-6 font-serif text-4xl font-black sm:text-6xl">
            Spread Joy &amp; Happiness
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-blush-100">
            Transform your special moments into unforgettable memories with our exclusive collection
            of premium hampers.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-full bg-white px-8 py-3 text-lg font-bold text-rose-deep transition hover:bg-blush-50"
          >
            🛍️ Start Shopping
          </Link>
          <div className="mt-12 grid grid-cols-2 gap-8 text-blush-100 md:grid-cols-4">
            {[
              { n: "100+", l: "Happy Customers" },
              { n: "200+", l: "Unique Designs" },
              { n: "24/7", l: "Support" },
              { n: "100%", l: "Satisfaction" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="mb-1 text-3xl font-black text-white">{s.n}</p>
                <p className="text-sm font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}