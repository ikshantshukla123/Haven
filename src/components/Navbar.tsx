"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/cart-context";
import { LOGO_URL, SITE } from "@/lib/site";

const NAV_ITEMS = [
  { path: "/products", label: "Products" },
  { path: "/speciality-cakes", label: "Special One" },
  { path: "/about", label: "About Us" },
  { path: "/contact-us", label: "Contact Us" },
];

function isActivePath(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar({ user }: { user: { email: string } | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={LOGO_URL}
              alt={`${SITE.name} logo`}
              className="h-14 w-14 rounded-2xl border-2 border-blush-200 object-cover"
            />
            <div className="absolute -inset-1 rounded-2xl border border-champagne-300" />
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-2xl font-bold text-rose-deep">
              Hamper Haven
            </p>
            <p className="text-xs font-medium text-ink-soft">{SITE.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center space-x-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  active
                    ? "bg-rose-deep text-white shadow-md shadow-rose-deep/25"
                    : "text-ink-soft hover:-translate-y-px hover:bg-blush-100 hover:text-rose-deep"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative rounded-xl border border-cream-200 bg-white p-3 text-ink transition-all duration-200 hover:-translate-y-px hover:border-rose-deep hover:text-rose-deep hover:shadow-md active:scale-90"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H19M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-deep px-1 text-[11px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
          {user && (
            <>
              <Link
                href="/admin"
                className="hidden rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-95 sm:block"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="hidden rounded-xl border border-blush-300 px-5 py-2.5 text-sm font-semibold text-rose-deep transition-all duration-200 hover:bg-blush-50 hover:shadow-sm active:scale-95 sm:block"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl bg-gradient-to-r from-rose-deep to-rose-deep-600 p-3 text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-90 lg:hidden"
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
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 active:scale-[0.99] ${
                  active
                    ? "bg-rose-deep text-white shadow-md shadow-rose-deep/25"
                    : "text-ink-soft hover:bg-blush-50 hover:text-rose-deep"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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