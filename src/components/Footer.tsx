import Link from "next/link";
import { LOGO_URL, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto bg-rose-deep-800 pt-12 pb-6 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center space-x-3 md:justify-start">
              <img
                src={LOGO_URL}
                alt={`${SITE.name} logo`}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div>
                <p className="font-serif text-xl font-bold text-white">Hamper Heaven</p>
                <p className="text-sm text-blush-200">{SITE.tagline}</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-blush-100">
              Creating unforgettable moments with beautifully crafted gift hampers
              that spread joy and happiness.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-blush-100 transition hover:text-white">
                About Us
              </Link>
              <Link href="/products" className="block text-blush-100 transition hover:text-white">
                Our Products
              </Link>
              <Link href="/speciality-cakes" className="block text-blush-100 transition hover:text-white">
                Special Collection
              </Link>
              <Link href="/contact-us" className="block text-blush-100 transition hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-blush-100">{SITE.phone}</p>
                <p className="text-xs text-blush-200">{SITE.hours}</p>
              </div>
              <div>
                <p className="text-blush-100">{SITE.email}</p>
                <p className="text-xs text-blush-200">We reply within 2 hours</p>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a
                href={`https://www.instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 border-t border-white/20 pt-6 text-sm text-blush-100 md:grid-cols-2">
          <p>Note: We do not have any return policy.</p>
          <p>Note: We require at least 5 days to make products.</p>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/20 pt-6 md:flex-row">
          <p className="text-sm text-blush-200">
            &copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
          </p>
          <div className="mt-3 flex space-x-6 text-sm text-blush-200 md:mt-0">
            <Link href="/contact-us" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact-us" className="hover:text-white">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-white">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}