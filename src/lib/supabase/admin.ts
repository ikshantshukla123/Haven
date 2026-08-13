import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service role client - server-side only, bypasses RLS.
// NEVER import this into client components.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "hamper-haven";
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}