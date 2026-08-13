-- Hamper Heaven — Supabase schema
-- Paste this into Supabase Dashboard -> SQL Editor -> New query -> Run
-- Run once. Safe to re-run (uses IF NOT EXISTS).

-- ============ TABLES ============

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null default 0,
  count_in_stock integer not null default 10,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id),
  product_name text,
  user_name text not null,
  user_mobile text not null,
  custom_details text,
  is_custom boolean not null default false,
  quantity integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

-- ============ RLS ============

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.contact_messages enable row level security;

-- Products: public read, admin write
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Orders: public insert (customers), admin read/delete
drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert" on public.orders
  for insert with check (true);

drop policy if exists "orders_admin_read" on public.orders;
create policy "orders_admin_read" on public.orders
  for select using (auth.role() = 'authenticated');

drop policy if exists "orders_admin_delete" on public.orders;
create policy "orders_admin_delete" on public.orders
  for delete using (auth.role() = 'authenticated');

-- Contact messages: public insert, admin read/delete
drop policy if exists "contact_public_insert" on public.contact_messages;
create policy "contact_public_insert" on public.contact_messages
  for insert with check (true);

drop policy if exists "contact_admin_read" on public.contact_messages;
create policy "contact_admin_read" on public.contact_messages
  for select using (auth.role() = 'authenticated');

drop policy if exists "contact_admin_delete" on public.contact_messages;
create policy "contact_admin_delete" on public.contact_messages
  for delete using (auth.role() = 'authenticated');

-- ============ STORAGE ============
-- Bucket: Hamper-haven (already created, public, 2MB, webp/png only)
-- Storage policies:

drop policy if exists "storage_public_read" on storage.objects;
create policy "storage_public_read" on storage.objects
  for select using (bucket_id = 'Hamper-haven');

drop policy if exists "storage_admin_upload" on storage.objects;
create policy "storage_admin_upload" on storage.objects
  for insert with check (bucket_id = 'Hamper-haven' and auth.role() = 'authenticated');

drop policy if exists "storage_admin_update" on storage.objects;
create policy "storage_admin_update" on storage.objects
  for update using (bucket_id = 'Hamper-haven' and auth.role() = 'authenticated');

drop policy if exists "storage_admin_delete" on storage.objects;
create policy "storage_admin_delete" on storage.objects
  for delete using (bucket_id = 'Hamper-haven' and auth.role() = 'authenticated');
