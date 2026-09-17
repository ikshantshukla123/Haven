import Link from "next/link";
import { LOGO_URL, SITE, whatsappLink } from "@/lib/site";

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
                <p className="font-serif text-xl font-bold text-white">Hamper Haven</p>
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all duration-200 hover:scale-110 hover:bg-white/25 active:scale-90"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1-5.25 5.25a5.25 5.25 0 0 1 5.25-5.25zm0 1.5a3.75 3.75 0 1 0 3.75 3.75a3.75 3.75 0 0 0-3.75-3.75zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                </svg>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all duration-200 hover:scale-110 hover:bg-white/25 active:scale-90"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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