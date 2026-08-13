import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import DetailClient from "./detail-client";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: allProducts }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("products").select("*").limit(50),
  ]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
        <div className="max-w-md rounded-xl border border-cream-200 bg-white p-8 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-ink">Product Not Found</h2>
          <p className="mb-6 text-ink-soft">This product does not exist.</p>
          <Link
            href="/products"
            className="rounded-full bg-rose-deep px-6 py-2 font-medium text-white hover:bg-rose-deep-600"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const related = (allProducts ?? [])
    .filter((p: Product) => p.id !== product.id)
    .slice(0, 4);

  return <DetailClient product={product} related={related} />;
}