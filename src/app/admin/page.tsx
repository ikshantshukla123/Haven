import { createClient } from "@/lib/supabase/server";
import AdminPanelClient from "./admin-client";
import AdminLoginForm from "./admin-login-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AdminLoginForm />;
  }

  return <AdminPanelClient userEmail={user.email ?? ""} />;
}