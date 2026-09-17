"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, HERO_IMAGES, galleryUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { discountPct, formatPrice, listingPrice } from "@/lib/types";

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
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (dir: 1 | -1) => {
    galleryRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

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
            Hamper Haven
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
              className="rounded-none bg-gradient-to-r from-rose-deep to-rose-deep-600 px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="rounded-none border border-white/30 bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg active:translate-y-0 active:scale-95"
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-3 text-sm font-semibold tracking-widest text-rose-deep uppercase">
              Our Work
            </p>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-5xl">
              Visual Elegance
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              Real hampers, crafted with love by Hamper Haven
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div
            ref={galleryRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-4 sm:gap-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GALLERY.map((photo, i) => (
              <motion.figure
                key={photo}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.08 }}
                className="w-[72vw] shrink-0 snap-center overflow-hidden rounded-xl sm:w-[300px] lg:w-[320px]"
              >
                <img
                  src={galleryUrl(photo)}
                  alt={`Hamper Haven creation ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[3/4] w-full select-none object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.figure>
            ))}
          </div>

          <button
            onClick={() => scrollGallery(-1)}
            aria-label="Scroll gallery left"
            className="absolute top-1/2 left-2 hidden -translate-y-1/2 rounded-full border border-cream-200 bg-white/90 p-3 text-ink shadow-lg backdrop-blur transition-all duration-200 hover:scale-110 hover:border-rose-deep hover:text-rose-deep hover:shadow-xl active:scale-95 md:block"
          >
            ←
          </button>
          <button
            onClick={() => scrollGallery(1)}
            aria-label="Scroll gallery right"
            className="absolute top-1/2 right-2 hidden -translate-y-1/2 rounded-full border border-cream-200 bg-white/90 p-3 text-ink shadow-lg backdrop-blur transition-all duration-200 hover:scale-110 hover:border-rose-deep hover:text-rose-deep hover:shadow-xl active:scale-95 md:block"
          >
            →
          </button>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => scrollGallery(-1)}
            aria-label="Scroll gallery left"
            className="rounded-full border border-cream-200 bg-white px-4 py-2 font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-rose-deep hover:text-rose-deep hover:shadow-md active:scale-90 md:hidden"
          >
            ←
          </button>
          <p className="text-sm font-medium text-ink-soft">Swipe to explore →</p>
          <button
            onClick={() => scrollGallery(1)}
            aria-label="Scroll gallery right"
            className="rounded-full border border-cream-200 bg-white px-4 py-2 font-semibold text-ink shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-rose-deep hover:text-rose-deep hover:shadow-md active:scale-90 md:hidden"
          >
            →
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-1 font-semibold text-rose-deep underline-offset-4 transition-all duration-200 hover:gap-2 hover:underline active:scale-95"
          >
            View all products
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
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
              {featured.map((p) => {
                const mrp = listingPrice(p);
                const pct = discountPct(p);
                return (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group block overflow-hidden rounded-lg border border-cream-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-rose-deep hover:shadow-lg"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush-50">
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
                    {p.description && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="line-clamp-4 text-center text-xs leading-relaxed text-white sm:text-sm">
                          {p.description}
                        </p>
                      </div>
                    )}
                    {pct !== null && (
                      <span className="absolute left-2 top-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        {pct}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-ink group-hover:text-rose-deep">
                      {p.name}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-1">
                      <span className="flex min-w-0 items-baseline gap-1">
                        <span className="text-sm font-bold text-ink">
                          ₹{formatPrice(Number(p.price))}
                        </span>
                        {mrp !== null && (
                          <s className="truncate text-[11px] font-medium text-ink-soft">
                            ₹{formatPrice(mrp)}
                          </s>
                        )}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-rose-deep">Order Now →</span>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
    </main>
  );
}