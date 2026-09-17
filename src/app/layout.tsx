import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/server";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamper Haven | Premium Gift Hampers",
  description:
    "Beautifully curated gift hampers for every special occasion. Custom gift requests welcome. Order in advance for guaranteed delivery.",
  metadataBase: new URL("https://haven-snowy.vercel.app"),
  openGraph: {
    title: "Hamper Haven | Premium Gift Hampers",
    description: "Beautifully curated gift hampers for every special occasion.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-50 font-sans text-ink">
        <CartProvider>
          <Navbar user={user ? { email: user.email ?? "" } : null} />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}