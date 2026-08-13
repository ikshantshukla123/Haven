"use client";

import { useState } from "react";
import OrderModal from "@/components/OrderModal";
import { SITE } from "@/lib/site";

export default function SpecialOnePage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center py-12 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-deep to-rose-deep-600 text-2xl shadow-lg">
            🎁
          </div>
          <h1 className="mb-4 font-serif text-4xl font-black text-ink sm:text-5xl">
            Create Your{" "}
            <span className="bg-gradient-to-r from-rose-deep to-rose-deep-600 bg-clip-text text-transparent">
              Special One
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft">
            Tell us about your dream gift. We&apos;ll craft something extraordinary just for you!
          </p>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-ink">Why Custom?</h2>
              <p className="leading-relaxed text-ink-soft">
                Our custom gifts are handcrafted with love and attention to detail. Perfect for:
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Special Occasions",
                "Birthdays & Anniversaries",
                "Weddings & Engagements",
                "Corporate Gifts",
                "Graduations",
                "Baby Showers",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blush-100">
                    <span className="text-sm">💝</span>
                  </div>
                  <span className="font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-blush-100 bg-blush-50 p-4">
              <h3 className="mb-2 font-semibold text-rose-deep">What happens next?</h3>
              <ul className="space-y-1 text-sm text-ink-soft">
                <li>We&apos;ll contact you within 24 hours</li>
                <li>Discuss your requirements in detail</li>
                <li>Provide design options and pricing</li>
                <li>Create your perfect gift!</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-cream-200 bg-white p-8 shadow-2xl">
            <p className="mb-4 text-center text-lg text-ink-soft">
              Share your idea and we&apos;ll bring it to life.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="w-full rounded-full bg-gradient-to-r from-rose-deep to-rose-deep-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:from-rose-deep-600 hover:to-rose-deep-700"
            >
              Start My Custom Gift
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-ink-soft">
          Need immediate assistance? Call us at{" "}
          <a href={SITE.phoneHref} className="font-semibold text-rose-deep">
            {SITE.phone}
          </a>
        </p>
      </div>

      {open && <OrderModal isCustom product={null} onClose={() => setOpen(false)} />}
    </main>
  );
}