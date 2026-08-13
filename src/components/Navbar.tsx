"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LOGO_URL, SITE } from "@/lib/site";

const NAV_ITEMS = [
  { path: "/about", label: "About Us" },
  { path: "/products", label: "Products" },
  { path: "/speciality-cakes", label: "Special One" },
  { path: "/contact-us", label: "Contact Us" },
];

export default function Navbar({ user }: { user: { email: string } | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream-50/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={LOGO_URL}
              alt={`${SITE.name} logo`}
              className="h-14 w-14 rounded-2xl border-2 border-blush-200 object-cover shadow-lg"
            />
            <div className="absolute -inset-1 rounded-2xl border border-champagne-300" />
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-2xl font-bold text-rose-deep">
              Hamper Heaven
            </p>
            <p className="text-xs font-medium text-ink-soft">{SITE.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center space-x-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-blush-100 text-rose-deep"
                    : "text-ink-soft hover:bg-cream-100 hover:text-rose-deep"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          {user && (
            <>
              <Link
                href="/admin"
                className="hidden rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:from-rose-deep-600 hover:to-rose-deep-700 sm:block"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="hidden rounded-xl border border-blush-300 px-5 py-2.5 text-sm font-semibold text-rose-deep transition hover:bg-blush-50 sm:block"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 p-3 text-white shadow-lg lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-cream-200 bg-cream-50 px-2 pb-4 pt-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-semibold text-ink-soft hover:bg-blush-50 hover:text-rose-deep"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-4 py-3 text-center text-base font-bold text-white"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 block w-full rounded-xl border border-blush-300 px-4 py-3 text-base font-semibold text-rose-deep"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}